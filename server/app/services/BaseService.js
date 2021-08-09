/* eslint-disable no-console, require-await */
class BaseService {
  model = null

  async queryAsync({
    conditionKV = null,
    orderBy = 'id',
    isAsc = false,
    limit = 0,
    page = 0,
    options = {}
  } = {}) {
    try {
      const pagination =
        limit >= 1 && page >= 1
          ? {
              limit,
              offset: (page - 1) * limit
            }
          : {}
      let result = null

      result = conditionKV
        ? await this.model.findAndCountAll({
            where: conditionKV,
            order: [[orderBy, isAsc ? 'ASC' : 'DESC']],
            ...options,
            ...pagination
          })
        : await this.model.findAndCountAll({ ...options })

      return result
    } catch (error) {
      console.error(error)

      return null
    }
  }

  async createAsync({ fieldKV, editableFields = null }) {
    try {
      if (editableFields?.length)
        return this.model.create(fieldKV, { fields: editableFields })

      return this.model.create(fieldKV)
    } catch (error) {
      console.error(error)

      return null
    }
  }

  async updateAsync({ fieldKV, conditionKV, editableFields = null }) {
    try {
      if (editableFields?.length) {
        return this.model.update(fieldKV, {
          where: conditionKV,
          fields: editableFields.filter(t => Object.keys(fieldKV).includes(t))
        })
      }

      return this.model.update(fieldKV, { where: conditionKV })
    } catch (error) {
      console.error(error)

      return null
    }
  }

  async removeAsync({ conditionKV }) {
    try {
      return this.model.destroy({ where: conditionKV })
    } catch (error) {
      console.error(error)

      return null
    }
  }
}

module.exports = {
  BaseService
}
