import { Request, Response } from 'express'
import { logError } from '../utils/logger'
import { NotFoundError, InternalServiceError } from '../constants/exceptions'
import { BaseService } from '../services/BaseService'

export abstract class BaseController {
  abstract service: BaseService
  editableFields: string[] | null = null
  queryOption: unknown = null
  isSearchable = true // Must have a "word" field

  handleError = (error: unknown, res: Response): void => {
    if (
      [error instanceof NotFoundError, error instanceof InternalServiceError].filter(t => t).length
    )
      res.status((error as { status?: number }).status || 500).json(error)
    else {
      res
        .status((error as { status?: number }).status || 500)
        .json({ message: 'Something went wrong while processing your request.' })
    }
  }

  getOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params
      const option = this.queryOption ? { options: this.queryOption } : null
      const result = await this.service.queryAsync({
        conditionKV: { id },
        ...option,
      })

      if (!result?.count) throw new NotFoundError({ message: 'No record found' })

      res.json(result.rows[0].dataValues)
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  getMultipleByWord = async (req: Request, res: Response): Promise<void> => {
    if (!this.isSearchable) throw new NotFoundError({ message: 'Not a searchable resource' })

    try {
      const { word } = req.query
      const limit = Math.abs(parseInt((req.query?.limit as string) ?? '0', 10))
      const page = Math.abs(parseInt((req.query?.page as string) ?? '0', 10))
      const isAsc = ((req.query?.asc as string) ?? 'false').toLowerCase() === 'true'
      const option = this.queryOption ? { options: this.queryOption } : null

      const result = await this.service.queryAsync({
        conditionKV: { word },
        limit,
        page,
        isAsc,
        ...option,
      })

      res.json(result?.rows.map(t => t.dataValues) ?? [])
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  // No filters for now
  getMultiple = async (req: Request, res: Response): Promise<void> => {
    try {
      const limit = Math.abs(parseInt((req.query?.limit as string) ?? '0', 10))
      const page = Math.abs(parseInt((req.query?.page as string) ?? '0', 10))
      const isAsc = ((req.query?.asc as string) ?? 'false').toLowerCase() === 'true'
      const option = this.queryOption ? { options: this.queryOption } : null

      const result = await this.service.queryAsync({ limit, page, isAsc, ...option })

      if (!result) {
        res.json([])

        return
      }

      res.json(result.rows.map(t => t.dataValues))
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  createOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.service.createAsync({
        fieldKV: { ...req.body },
        editableFields: this.editableFields,
      })

      if (!result || !(result.dataValues as { id?: number })?.id)
        throw new InternalServiceError({ message: 'Cannot create record' })

      res.json(result.dataValues)
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  updateOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params

      await this.service.updateAsync({
        conditionKV: { id },
        fieldKV: { ...req.body },
        editableFields: this.editableFields,
      })

      const option = this.queryOption ? { options: this.queryOption } : null
      const result = await this.service.queryAsync({ conditionKV: { id }, ...option })

      if (!result || !result.count) throw new NotFoundError({ message: 'No record found' })

      res.json(result.rows[0].dataValues)
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }

  deleteOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params

      await this.service.removeAsync({ conditionKV: { id } })

      res.json('OK')
    } catch (error) {
      logError(error)
      this.handleError(error, res)
    }
  }
}

