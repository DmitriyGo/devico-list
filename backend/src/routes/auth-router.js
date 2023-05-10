import Router from 'koa-router'
import {
  register,
  login,
  logout,
  refresh,
  checkLogin,
} from '../controllers/auth'
import setJsonContentType from '../middlewares/content-type'

const router = new Router()

router.prefix('/auth')

router.use(setJsonContentType)

router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

router.post('/refresh', refresh)

router.post('/check-login', checkLogin)

export default router
