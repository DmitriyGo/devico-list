import { Token } from '../../entities/token'

const removeToken = async (refreshToken) => {
  return Token.deleteOne({ refreshToken })
}

export default removeToken
