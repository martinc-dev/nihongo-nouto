import { Request, Response } from 'express'
import { InternalServiceError } from '../constants/exceptions'
import { logError } from '../utils/logger'
import { parseCSV, toCSV } from '../utils/csv'
import { NounTagRel, NounTag } from '../models'
import { NounTagService } from '../services/NounTagService'
import { NounTagRelService } from '../services/NounTagRelService'
import { NounService } from '../services/NounService'
import { OtherService } from '../services/OtherService'
import { AdjService } from '../services/AdjService'
import { VerbService } from '../services/VerbService'
import { BaseController } from './BaseController'

export class NounTagController extends BaseController {
  service = new NounTagService()
  editableFields = ['name']
  isSearchable = false
}

export class NounTagRelController extends BaseController {
  service = new NounTagRelService()
  editableFields = ['nounId', 'tagId']
  isSearchable = false
}

export class NounController extends BaseController {
  service = new NounService()
  editableFields = ['word', 'hiragana', 'sense']
  queryOption = {
    // SubQuery: false is critical here when filtering by associated model (nounTagRel)
    // With limit/offset (pagination). Without it, Sequelize creates a subquery
    // For pagination that excludes the joined table, causing "Unknown column" error.
    subQuery: false,
    include: [
      {
        model: NounTagRel,
        as: 'nounTagRel',
        include: [{ model: NounTag, as: 'nounTag' }],
      },
    ],
  }

  createOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const newWord = await this.service.insertNoun({ ...req.body })

      if (!newWord || !(newWord.dataValues as { id?: number })?.id)
        throw new InternalServiceError({ message: 'Cannot create record' })

      const { id } = newWord.dataValues as { id: number }

      const result = await this.service.queryAsync({
        conditionKV: { id },
        options: this.queryOption,
      })

      if (!result?.count)
        throw new InternalServiceError({ message: 'Cannot find new record' })

      res.json(result.rows[0].dataValues)
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  updateOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const result = await this.service.updateNoun({ ...req.body, id: parseInt(id, 10) })

      if (!result?.count)
        throw new InternalServiceError({ message: 'Cannot find new record' })

      res.json(result.rows[0].dataValues)
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  exportWords = async (req: Request, res: Response): Promise<void> => {
    try {
      // For NounController, we want to export tags as well
      const result = await this.service.queryAsync({
        limit: 0,
        options: this.queryOption,
      })

      if (!result || !result.rows) {
        res.header('Content-Type', 'text/csv').send('')

        return
      }

      const rows = result.rows.map(r => {
        const vals = r.dataValues
        const cleanVals: Record<string, unknown> = {}

        // Handle standard fields
        for (const key in vals) {
          const val = vals[key]

          if (
            val === null ||
            val === undefined ||
            key === 'nounTagRel' ||
            key === 'nounTag'
          ) {
            // Skip relation objects in main loop
          } else if (typeof val !== 'object') {
            cleanVals[key] = val
          } else if (val instanceof Date) {
            cleanVals[key] = val.toISOString()
          } else {
            cleanVals[key] = ''
          }
        }

        // Handle noun tags
        if (vals.nounTagRel && Array.isArray(vals.nounTagRel)) {
          const tagIds = vals.nounTagRel
            .map(
              (
                rel: InstanceType<typeof NounTagRel> & {
                  nounTag?: InstanceType<typeof NounTag>
                },
              ) => rel.nounTag?.dataValues.id || rel.dataValues?.tagId,
            )
            .filter((id: number | undefined) => id)
            .join(',')

          cleanVals['tag_ids'] = tagIds
        } else {
          cleanVals['tag_ids'] = ''
        }

        return cleanVals
      })

      const csv = toCSV(rows)

      res.header('Content-Type', 'text/csv')
      res.attachment('export.csv')
      res.send(csv)
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  importWords = async (req: Request, res: Response): Promise<void> => {
    try {
      const csvContent = req.body

      if (typeof csvContent !== 'string') {
        throw new InternalServiceError({ message: 'Invalid CSV content' })
      }

      const records = parseCSV(csvContent)

      let successCount = 0
      let failCount = 0
      let skippedCount = 0

      // TODO: Needs a queue for this
      // Process sequentially to avoid database locking issues with tags
      for (const record of records) {
        try {
          // Duplication check
          if (record.word && record.sense) {
            // eslint-disable-next-line no-await-in-loop
            const existing = await this.service.queryAsync({
              conditionKV: {
                word: record.word as string,
                sense: record.sense as string,
              },
              limit: 1,
            })

            // eslint-disable-next-line max-depth
            if (existing?.count) {
              skippedCount++
              continue
            }
          }

          // Process tag_ids if present
          let tagIds: number[] = []

          if (record.tag_ids) {
            tagIds = String(record.tag_ids)
              .split(',')
              .map(id => parseInt(id.trim(), 10))
              .filter(id => !isNaN(id))
          }

          // eslint-disable-next-line no-await-in-loop
          await this.service.insertNoun({
            word: record.word as string,
            hiragana: record.hiragana as string,
            sense: record.sense as string,
            tagIds,
          })
          successCount++
        } catch (e) {
          logError(e)
          failCount++
        }
      }

      res.json({
        message: 'Import completed',
        success: successCount,
        failed: failCount,
        skipped: skippedCount,
      })
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }
}

export class OtherController extends BaseController {
  service = new OtherService()
  editableFields = ['word', 'hiragana', 'sense']
}

export class AdjController extends BaseController {
  service = new AdjService()
  editableFields = ['word', 'hiragana', 'sense', 'isIConjugation']
}

export class VerbController extends BaseController {
  service = new VerbService()
  editableFields = [
    'word',
    'hiragana',
    'group',
    'sense',
    'stem',
    'teForm',
    'aDan',
    'eDan',
    'oDan',
    'isTransitive',
    'isIntransitive',
  ]
}

export * from './JishoController'
