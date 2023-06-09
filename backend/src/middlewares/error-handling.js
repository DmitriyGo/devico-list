import ApiError from '../exceptions/ApiError'

export const errorHandler = async (err, ctx) => {
  if (err instanceof ApiError) {
    ctx.status = err.status
    ctx.body = {
      message: err.message,
      errors: err.errors,
    }

    return
  } else {
    ctx.status = 500
    ctx.body = {
      message: 'Internal Server Error',
    }
  }
}
