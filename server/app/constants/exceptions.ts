export class BaseError extends Error {
  status?: number
  data?: { error: unknown }

  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class InternalServiceError extends BaseError {
  constructor(error: { message?: string } = {}) {
    super(error.message || 'Internal service error')
    this.data = { error }
    this.status = 500
  }
}

export class NotFoundError extends BaseError {
  constructor(error: { message?: string } = {}) {
    super(error.message || 'Not found')
    this.data = { error }
    this.status = 404
  }
}
