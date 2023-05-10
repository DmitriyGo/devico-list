import { verify } from 'jsonwebtoken'

const validateAccessToken = (token) => {
  try {
    return verify(token, process.env.JWT_ACCESS_SECRET)
  } catch (e) {
    return null
  }
}

export default validateAccessToken
