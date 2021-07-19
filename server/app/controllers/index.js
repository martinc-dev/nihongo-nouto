const { InternalServiceError } = require('../constants/exceptions')
const { logError } = require('../utils/logger')
const { NounTagRel } = require('../models')
const { NounTagService } = require('../services/NounTagService')
const { NounTagRelService } = require('../services/NounTagRelService')
const { NounService } = require('../services/NounService')
const { OtherService } = require('../services/OtherService')
const { AdjService } = require('../services/AdjService')
const { VerbService } = require('../services/VerbService')
const { BaseController } = require('./BaseController')

class NounTagController extends BaseController {
  service = new NounTagService()
  editableFields = ['name']
}

class NounTagRelController extends BaseController {
  service = new NounTagRelService()
  editableFields = ['nounId', 'tagId']
}

class NounController extends BaseController {
  service = new NounService()
  editableFields = ['word', 'romaji', 'sense']
  queryOption = { include: [{ model: NounTagRel, as: 'nounTagRel' }] }

  createOne = async (req, res) => {
    try {
      const result = await this.service.insertNoun({ ...req.body })

      if (!result?.dataValues?.id) throw new InternalServiceError({ message: 'Cannot create record' })

      return res.json(result.dataValues)
    } catch (error) {
      logError(error)
      res.status(error.status || 500).json(error)
    }
  }
}

class OtherController extends BaseController {
  service = new OtherService()
  editableFields = ['word', 'romaji', 'sense']
}

class AdjController extends BaseController {
  service = new AdjService()
  editableFields = ['word', 'romaji', 'sense', 'isIConjugation']
}

class VerbController extends BaseController {
  service = new VerbService()
  editableFields = [
    'word',
    'romaji',
    'group',
    'sense',
    'stem',
    'teForm',
    'aDan',
    'eDan',
    'oDan',
    'isTransitive',
    'isIntransitive'
  ]
}

module.exports = {
  NounTagController,
  NounTagRelController,
  NounController,
  OtherController,
  AdjController,
  VerbController
}
