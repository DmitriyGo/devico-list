import removeToken from '../token/removeToken'

const logout = async (refreshToken) => {
  return await removeToken(refreshToken)
}

export default logout
