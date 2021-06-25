class BaseError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

class InternalServiceError extends BaseError {
  constructor(error = {}) {
    super(error.message)
    this.data = { error }
    this.status = 500
  }
}

class NotFoundError extends BaseError {
  constructor(error = {}) {
    super(error.message)
    this.data = { error }
    this.status = 404
  }
}

module.exports = {
  InternalServiceError,
  NotFoundError
}
