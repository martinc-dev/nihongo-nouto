const { Adv } = require('../models')
const { BaseService } = require('./BaseService')

class AdvService extends BaseService {
  model = Adv
}

module.exports = {
  AdvService
}
