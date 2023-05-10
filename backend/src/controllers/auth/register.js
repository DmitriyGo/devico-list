import registerService from '../../services/auth/register'
import * as yup from 'yup'
import ApiError from '../../exceptions/ApiError'
import UserResponseDto from '../../dtos/UserResponseDto'

const registerSchema = yup.object().shape({
  login: yup.string().required(),
  password: yup
    .string()
    .min(6, 'Password minimum length 6 characters ')
    .required(),
})

const register = async (ctx) => {
  try {
    const { login, password } = await registerSchema.validate(
      ctx.request.body,
      {
        abortEarly: false,
      },
    )

    const userData = await registerService(login, password)

    ctx.cookies.set('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })

    ctx.body = new UserResponseDto(userData)
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = error.errors.map((err) => err.replace(/"/g, ''))
      ctx.throw(ApiError.ValidationError(validationErrors))
    } else {
      ctx.throw(error)
    }
  }
}

export default register
