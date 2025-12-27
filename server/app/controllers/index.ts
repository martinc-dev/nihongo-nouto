import { Request, Response } from 'express'
import { InternalServiceError } from '../constants/exceptions'
import { logError } from '../utils/logger'
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
