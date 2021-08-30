const { Verb } = require('../models')
const { BaseService } = require('./BaseService')

class VerbService extends BaseService {
  model = Verb
}

module.exports = {
  VerbService,
}
