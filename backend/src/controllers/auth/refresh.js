import UserResponseDto from '../../dtos/UserResponseDto'
import refreshService from '../../services/auth/refresh'

const refresh = async (ctx) => {
  try {
    const refreshToken = ctx.cookies.get('refreshToken')

    if (!refreshToken) {
      ctx.status = 401
      return
    }

    const userData = await refreshService(refreshToken)

    ctx.cookies.set('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })

    ctx.body = new UserResponseDto(userData)
  } catch (error) {
    ctx.throw(error)
  }
}

export default refresh
