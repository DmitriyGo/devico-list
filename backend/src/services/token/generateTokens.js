import { sign } from 'jsonwebtoken'

const generateTokens = (payload) => {
  const accessToken = sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '1d',
  })
  const refreshToken = sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '30d',
  })

  return {
    accessToken,
    refreshToken,
  }
}

export default generateTokens
