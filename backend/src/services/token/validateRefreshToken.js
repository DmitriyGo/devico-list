import { verify } from 'jsonwebtoken'

const validateRefreshToken = (token) => {
  try {
    return verify(token, process.env.JWT_REFRESH_SECRET)
  } catch (e) {
    return null
  }
}

export default validateRefreshToken
