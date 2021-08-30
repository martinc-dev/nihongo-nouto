const { Adj } = require('../models')
const { BaseService } = require('./BaseService')

class AdjService extends BaseService {
  model = Adj
}

module.exports = {
  AdjService,
}
