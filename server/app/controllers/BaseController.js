const { logError } = require('../utils/logger')
const { NotFoundError, InternalServiceError } = require('../constants/exceptions')

class BaseController {
  service = null
  editableFields = null
  queryOption = null
  isSearchable = true // Must have a "word" field

  handleError = (error, res) => {
    if (
      [error instanceof NotFoundError, error instanceof InternalServiceError].filter(
        t => t
      ).length
    )
      res.status(error.status || 500).json(error)
    else {
      res
        .status(error.status || 500)
        .json({ message: 'Something went wrong while processing your request.' })
    }
  }

  getOne = async (req, res) => {
    try {
      const { id } = req.params
      const option = this.queryOption ? { options: this.queryOption } : null
      const result = await this.service.queryAsync({ conditionKV: { id }, ...option })

      if (!result?.count) throw new NotFoundError({ message: 'No record found' })

      return res.json(result.rows[0].dataValues)
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  getMultipleByWord = async (req, res) => {
    if (!this.isSearchable)
      throw new NotFoundError({ message: 'Not a searchable resource' })

    try {
      const { word } = req.query
      const limit = Math.abs(parseInt(req.query?.limit ?? 0))
      const page = Math.abs(parseInt(req.query?.page ?? 0))
      const isAsc = (req.query?.asc ?? 'false').toLowerCase() === 'true'
      const option = this.queryOption ? { options: this.queryOption } : null

      const result = await this.service.queryAsync({
        conditionKV: { word },
        limit,
        page,
        isAsc,
        ...option,
      })

      return res.json(result.rows.map(t => t.dataValues))
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  // No filters for now
  getMultiple = async (req, res) => {
    try {
      const limit = Math.abs(parseInt(req.query?.limit ?? 0))
      const page = Math.abs(parseInt(req.query?.page ?? 0))
      const isAsc = (req.query?.asc ?? 'false').toLowerCase() === 'true'
      const option = this.queryOption ? { options: this.queryOption } : null

      const result = await this.service.queryAsync({ limit, page, isAsc, ...option })

      return res.json(result.rows.map(t => t.dataValues))
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  createOne = async (req, res) => {
    try {
      const result = await this.service.createAsync({
        fieldKV: { ...req.body },
        editableFields: this.editableFields,
      })

      if (!result?.dataValues?.id)
        throw new InternalServiceError({ message: 'Cannot create record' })

      return res.json(result.dataValues)
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  updateOne = async (req, res) => {
    try {
      const { id } = req.params

      await this.service.updateAsync({
        conditionKV: { id },
        fieldKV: { ...req.body },
        editableFields: this.editableFields,
      })

      const option = this.queryOption ? { options: this.queryOption } : null
      const result = await this.service.queryAsync({ conditionKV: { id }, ...option })

      if (!result?.count) throw new NotFoundError({ message: 'No record found' })

      return res.json(result.rows[0].dataValues)
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  deleteOne = async (req, res) => {
    try {
      const { id } = req.params

      await this.service.removeAsync({ conditionKV: { id } })

      return res.json('OK')
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }
}

module.exports = {
  BaseController,
}
