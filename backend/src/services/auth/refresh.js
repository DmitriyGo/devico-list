import { User } from '../../entities/user'
import UserDto from '../../dtos/UserDto'

import generateTokens from '../token/generateTokens'
import saveToken from '../token/saveToken'
import ApiError from '../../exceptions/ApiError'
import validateRefreshToken from '../token/validateRefreshToken'
import findToken from '../token/findToken'

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError()
  }

  const userData = validateRefreshToken(refreshToken)
  const tokenFromDb = await findToken(refreshToken)

  if (!userData && !tokenFromDb) {
    throw ApiError.UnauthorizedError()
  }

  const user = await User.findById(userData.id)
  const userDto = new UserDto(user)
  const tokens = generateTokens({ ...userDto })

  await saveToken(userDto.id, tokens.refreshToken)

  return {
    ...tokens,
    user: userDto,
  }
}

export default refresh
