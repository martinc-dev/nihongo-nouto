const { Other } = require('../models')
const { BaseService } = require('./BaseService')

class OtherService extends BaseService {
  model = Other
}

module.exports = {
  OtherService
}
