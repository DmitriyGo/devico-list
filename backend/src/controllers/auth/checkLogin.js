import { User } from '../../entities/user'
import ApiError from '../../exceptions/ApiError'

const checkLogin = async (ctx) => {
  try {
    const { login } = ctx.request.body

    if (!login.trim()) {
      ctx.status = 204
      return
    }

    const foundUser = await User.findOne({ login })

    ctx.body = !!foundUser
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = error.errors.map((err) => err.replace(/"/g, ''))
      ctx.throw(ApiError.ValidationError(validationErrors))
    } else {
      ctx.throw(error)
    }
  }
}

export default checkLogin
