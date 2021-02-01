/* eslint-disable no-console, require-await */
class BaseService {
  model = null

  deepCopyResult(result) {
    try {
      return JSON.parse(JSON.stringify(result))
    } catch (error) {
      console.error(error)

      return null
    }
  }

  async queryAsync({ conditionKV = null, orderBy = 'id', isAsc = false, limit = 0, page = 0 }) {
    try {
      const pagination =
        limit >= 1 && page >= 1
          ? {
              limit,
              offset: (page - 1) * limit
            }
          : {}
      let result = null

      result = conditionKV ? await this.model.findAndCountAll({ where: conditionKV, order: [[orderBy, isAsc ? 'ASC' : 'DESC']], ...pagination }) : await this.model.findAndCountAll()

      return this.deepCopyResult(result)
    } catch (error) {
      console.error(error)

      return null
    }
  }

  async createAsync({ fieldKV }) {
    try {
      return this.deepCopyResult(this.model.create(fieldKV))
    } catch (error) {
      console.error(error)

      return null
    }
  }

  async updateAsync({ fieldKV, conditionKV }) {
    try {
      return this.deepCopyResult(this.model.update(fieldKV, { where: conditionKV }))
    } catch (error) {
      console.error(error)

      return null
    }
  }

  async removeAsync({ conditionKV }) {
    try {
      return this.deepCopyResult(this.model.destroy({ where: conditionKV }))
    } catch (error) {
      console.error(error)

      return null
    }
  }
}

module.exports = {
  BaseService
}
