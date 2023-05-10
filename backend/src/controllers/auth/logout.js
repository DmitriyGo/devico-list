import logoutService from '../../services/auth/logout'

const logout = async (ctx) => {
  try {
    const refreshToken = ctx.cookies.get('refreshToken')
    const token = await logoutService(refreshToken)

    ctx.cookies.set('refreshToken', null)

    ctx.body = token
  } catch (error) {
    ctx.throw(error)
  }
}

export default logout
