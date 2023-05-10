import { Token } from '../../entities/token'

const findToken = async (refreshToken) => {
  return Token.findOne({ refreshToken })
}

export default findToken
