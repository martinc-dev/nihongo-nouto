const { NounTag } = require('../models')
const { BaseService } = require('./BaseService')

class NounTagService extends BaseService {
  model = NounTag
}

module.exports = {
  NounTagService
}
