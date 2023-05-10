import { compare } from 'bcrypt'

import { User } from '../../entities/user'
import UserDto from '../../dtos/UserDto'

import generateTokens from '../token/generateTokens'
import saveToken from '../token/saveToken'
import ApiError from '../../exceptions/ApiError'

const login = async (login, password) => {
  const candidate = await User.findOne({ login })

  if (!candidate) {
    throw ApiError.BadRequest("User with this login doesn't exist")
  }

  const isPassEqual = await compare(password, candidate.password)

  if (!isPassEqual) {
    throw ApiError.BadRequest('Wrong password')
  }

  const userDto = new UserDto(candidate)
  const tokens = generateTokens({ ...userDto })

  await saveToken(userDto.id, tokens.refreshToken)

  return {
    ...tokens,
    user: userDto,
  }
}

export default login
