import { hash } from 'bcrypt'

import { User } from '../../entities/user'
import UserDto from '../../dtos/UserDto'

import generateTokens from '../token/generateTokens'
import saveToken from '../token/saveToken'
import ApiError from '../../exceptions/ApiError'

const register = async (login, password) => {
  const candidate = await User.findOne({ login })

  if (candidate) {
    throw ApiError.BadRequest('User with this login already exists')
  }

  const hashPassword = await hash(password, 3)

  const user = await User.create({ login, password: hashPassword })

  const userDto = new UserDto(user)

  const tokens = generateTokens({ ...userDto })

  await saveToken(userDto.id, tokens.refreshToken)

  return {
    ...tokens,
    user: userDto,
  }
}

export default register
