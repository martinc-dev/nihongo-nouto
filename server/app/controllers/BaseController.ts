/* eslint-disable max-lines */
import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { logError } from '../utils/logger'
import { parseCSV, toCSV } from '../utils/csv'
import { NotFoundError, InternalServiceError } from '../constants/exceptions'
import { BaseService } from '../services/BaseService'

export abstract class BaseController {
  abstract service: BaseService
  editableFields: string[] | null = null
  queryOption: unknown = null
  isSearchable = true // Must have a "word" field

  handleError = (error: unknown, res: Response): void => {
    if (
      [error instanceof NotFoundError, error instanceof InternalServiceError].filter(
        t => t,
      ).length
    )
      res.status((error as { status?: number }).status || 500).json(error)
    else {
      res
        .status((error as { status?: number }).status || 500)
        .json({ message: 'Something went wrong while processing your request.' })
    }
  }

  getOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const option = this.queryOption ? { options: this.queryOption } : null
      const result = await this.service.queryAsync({
        conditionKV: { id },
        ...option,
      })

      if (!result?.count) throw new NotFoundError({ message: 'No record found' })

      res.json(result.rows[0].dataValues)
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  getMultipleByWord = async (req: Request, res: Response): Promise<void> => {
    if (!this.isSearchable)
      throw new NotFoundError({ message: 'Not a searchable resource' })

    try {
      const { word, sense } = req.query
      const limit = Math.abs(parseInt((req.query?.limit as string) ?? '0', 10))
      const page = Math.abs(parseInt((req.query?.page as string) ?? '0', 10))
      const orderBy = (req.query?.orderBy as string) ?? 'id'
      const isAsc = ((req.query?.asc as string) ?? 'false').toLowerCase() === 'true'
      const option = this.queryOption ? { options: this.queryOption } : null

      const conditionKV: Record<string, unknown> = { word }

      if (sense) {
        conditionKV.sense = sense
      }

      const result = await this.service.queryAsync({
        conditionKV,
        limit,
        page,
        orderBy,
        isAsc,
        ...option,
      })

      if (!result) {
        res.json({
          data: [],
          pagination: {
            total: 0,
            page: 1,
            limit: limit || 0,
            totalPages: 0,
          },
        })

        return
      }

      // !!! CAUTION: This could be a performance issue if the result is large
      if (limit === 0 || page === 0) {
        res.json({
          data: result.rows.map(t => t.dataValues),
          pagination: {
            total: result.count,
            page: 1,
            limit: result.count,
            totalPages: 1,
          },
        })

        return
      }

      const totalPages = Math.ceil(result.count / limit)

      res.json({
        data: result.rows.map(t => t.dataValues),
        pagination: {
          total: result.count,
          page,
          limit,
          totalPages,
        },
      })
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  private buildFilterConditions(
    filters?: string | string[],
  ): Record<string, unknown> | null {
    if (!filters) return null

    const filterArray = Array.isArray(filters) ? filters : [filters]

    if (filterArray.length === 0) return null

    // Map filter keys to database values
    // For verbs: GoDan, IchiDan, SuRu, KuRu -> group values
    // For adjectives: I-Adj, Na-Adj -> isIConjugation values
    const verbGroupMap: Record<string, string[]> = {
      GoDan: ['V5U', 'V5K', 'V5G', 'V5S', 'V5T', 'V5M', 'V5B', 'V5N', 'V5R', 'V5KS'],
      IchiDan: ['V1'],
      SuRu: ['IRS'],
      KuRu: ['IRK'],
    }

    const conditions: Record<string, unknown> = {}

    const verbFilters = filterArray.filter(f =>
      ['GoDan', 'IchiDan', 'SuRu', 'KuRu'].includes(f),
    )

    if (verbFilters.length > 0) {
      const groupValues = verbFilters.flatMap(filter => verbGroupMap[filter] || [])

      if (groupValues.length > 0) {
        conditions.group = { [Op.in]: groupValues }
      }
    }

    const adjFilters = filterArray.filter(f => ['I-Adj', 'Na-Adj'].includes(f))

    if (adjFilters.length === 1) {
      conditions.isIConjugation = adjFilters[0] === 'I-Adj'
    }

    const nounTagMap: Record<string, number> = {
      Things: 1,
      Abstract: 2,
      Location: 3,
      Time: 4,
      People: 5,
      Other: 6,
    }

    const nounFilters = filterArray.filter(f => Object.keys(nounTagMap).includes(f))

    if (nounFilters.length > 0) {
      const tagIds = nounFilters.map(f => nounTagMap[f])

      conditions['$nounTagRel.tag_id$'] = { [Op.in]: tagIds }
    }

    return Object.keys(conditions).length > 0 ? conditions : null
  }

  getMultiple = async (req: Request, res: Response): Promise<void> => {
    try {
      const limit = Math.abs(parseInt((req.query?.limit as string) ?? '0', 10))
      const page = Math.abs(parseInt((req.query?.page as string) ?? '0', 10))
      const orderBy = (req.query?.orderBy as string) ?? 'id'
      const isAsc = ((req.query?.asc as string) ?? 'false').toLowerCase() === 'true'
      const filters = req.query?.filters as string | string[] | undefined
      const option = this.queryOption ? { options: this.queryOption } : null

      const filterConditions = this.buildFilterConditions(filters)

      const conditionKV = filterConditions || null

      const result = await this.service.queryAsync({
        conditionKV,
        limit,
        page,
        orderBy,
        isAsc,
        ...option,
      })

      if (!result) {
        res.json({
          data: [],
          pagination: {
            total: 0,
            page: 1,
            limit: limit || 0,
            totalPages: 0,
          },
        })

        return
      }

      // !!! CAUTION: This could be a performance issue if the result is large
      if (limit === 0 || page === 0) {
        res.json({
          data: result.rows.map(t => t.dataValues),
          pagination: {
            total: result.count,
            page: 1,
            limit: result.count,
            totalPages: 1,
          },
        })

        return
      }

      const totalPages = Math.ceil(result.count / limit)

      res.json({
        data: result.rows.map(t => t.dataValues),
        pagination: {
          total: result.count,
          page,
          limit,
          totalPages,
        },
      })
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  createOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.service.createAsync({
        fieldKV: { ...req.body },
        editableFields: this.editableFields,
      })

      if (!result || !(result.dataValues as { id?: number })?.id)
        throw new InternalServiceError({ message: 'Cannot create record' })

      res.json(result.dataValues)
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  updateOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params

      await this.service.updateAsync({
        conditionKV: { id },
        fieldKV: { ...req.body },
        editableFields: this.editableFields,
      })

      const option = this.queryOption ? { options: this.queryOption } : null
      const result = await this.service.queryAsync({ conditionKV: { id }, ...option })

      if (!result || !result.count)
        throw new NotFoundError({ message: 'No record found' })

      res.json(result.rows[0].dataValues)
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  deleteOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params

      await this.service.removeAsync({ conditionKV: { id } })

      res.json('OK')
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  exportWords = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.service.queryAsync({ limit: 0 })

      if (!result || !result.rows) {
        res.header('Content-Type', 'text/csv').send('')

        return
      }

      const rows = result.rows.map(r => {
        const vals = r.dataValues
        const cleanVals: Record<string, unknown> = {}

        for (const key in vals) {
          const val = vals[key]

          if (val === null || val === undefined) {
            cleanVals[key] = ''
          } else if (typeof val !== 'object') {
            cleanVals[key] = val
          } else if (val instanceof Date) {
            cleanVals[key] = val.toISOString()
          }
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
      for (const record of records) {
        try {
          const fieldKV = this.editableFields
            ? Object.keys(record)
                .filter(key => this.editableFields!.includes(key))
                .reduce(
                  (obj, key) => {
                    obj[key] = record[key]

                    return obj
                  },
                  {} as Record<string, unknown>,
                )
            : record

          if (Object.keys(fieldKV).length === 0) {
            failCount++
            continue
          }

          // Duplication check
          if (fieldKV.word) {
            // eslint-disable-next-line no-await-in-loop
            const existing = await this.service.queryAsync({
              conditionKV: {
                word: fieldKV.word,
                sense: fieldKV.sense,
              },
              limit: 1,
            })

            // eslint-disable-next-line max-depth
            if (existing?.count) {
              skippedCount++
              continue
            }
          }

          // eslint-disable-next-line no-await-in-loop
          await this.service.createAsync({
            fieldKV,
            editableFields: this.editableFields,
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
