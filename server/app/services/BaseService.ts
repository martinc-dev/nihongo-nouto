/* eslint-disable no-console, require-await */
import {
  Model,
  ModelStatic,
  FindAndCountOptions,
  CreateOptions,
  UpdateOptions,
  DestroyOptions,
} from 'sequelize'

export interface QueryAsyncParams {
  conditionKV?: Record<string, unknown> | null
  orderBy?: string
  isAsc?: boolean
  limit?: number
  page?: number
  options?: FindAndCountOptions
}

export interface CreateAsyncParams {
  fieldKV: Record<string, unknown>
  editableFields?: string[] | null
}

export interface UpdateAsyncParams {
  fieldKV: Record<string, unknown>
  conditionKV: Record<string, unknown>
  editableFields?: string[] | null
}

export interface RemoveAsyncParams {
  conditionKV: Record<string, unknown>
}

export abstract class BaseService {
  abstract model: ModelStatic<Model>
  queryOption: FindAndCountOptions | null = null

  async queryAsync({
    conditionKV = null,
    orderBy = 'id',
    isAsc = false,
    limit = 0,
    page = 0,
    options = {},
  }: QueryAsyncParams = {}): Promise<{ count: number; rows: Model[] } | null> {
    try {
      const pagination =
        limit >= 1 && page >= 1
          ? {
              limit,
              offset: (page - 1) * limit,
            }
          : {}
      let result: { count: number; rows: Model[] } | null = null

      result = conditionKV
        ? await this.model.findAndCountAll({
            where: conditionKV,
            order: [[orderBy, isAsc ? 'ASC' : 'DESC']],
            ...options,
            ...pagination,
          } as FindAndCountOptions)
        : await this.model.findAndCountAll({ ...options } as FindAndCountOptions)

      return result
    } catch (error) {
      console.error(error)

      return null
    }
  }

  async createAsync({ fieldKV, editableFields = null }: CreateAsyncParams): Promise<Model | null> {
    try {
      if (editableFields?.length)
        return this.model.create(fieldKV as Record<string, unknown>, {
          fields: editableFields,
        } as CreateOptions)

      return this.model.create(fieldKV as Record<string, unknown>)
    } catch (error) {
      console.error(error)

      return null
    }
  }

  async updateAsync({
    fieldKV,
    conditionKV,
    editableFields = null,
  }: UpdateAsyncParams): Promise<[number] | null> {
    try {
      if (editableFields?.length) {
        return this.model.update(fieldKV, {
          where: conditionKV,
          fields: editableFields.filter(t => Object.keys(fieldKV).includes(t)),
        } as UpdateOptions)
      }

      return this.model.update(fieldKV, { where: conditionKV } as UpdateOptions)
    } catch (error) {
      console.error(error)

      return null
    }
  }

  async removeAsync({ conditionKV }: RemoveAsyncParams): Promise<number | null> {
    try {
      return this.model.destroy({ where: conditionKV } as DestroyOptions)
    } catch (error) {
      console.error(error)

      return null
    }
  }
}

