const { NounTagRel } = require('../models')
const { BaseService } = require('./BaseService')

class NounTagRelService extends BaseService {
  model = NounTagRel
}

module.exports = {
  NounTagRelService
}
