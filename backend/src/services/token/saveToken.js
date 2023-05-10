import { Token } from '../../entities/token'

const saveToken = async (userId, refreshToken) => {
  const tokenData = await Token.findOne({ user: userId })

  if (tokenData) {
    tokenData.refreshToken = refreshToken
    return tokenData.save()
  }

  return await Token.create({ user: userId, refreshToken })
}

export default saveToken
