import validateAccessToken from '../services/token/validateAccessToken'
import ApiError from '../exceptions/ApiError'

const authMiddleware = async (ctx, next) => {
  try {
    const authorizationHeader = ctx.headers.authorization
    if (!authorizationHeader) {
      throw ApiError.UnauthorizedError()
    }

    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = validateAccessToken(accessToken)

    if (!userData) {
      ctx.status = 401
      return
    }

    ctx.state.user = userData
    await next()
  } catch (e) {
    ctx.throw(e)
  }
}

export default authMiddleware
