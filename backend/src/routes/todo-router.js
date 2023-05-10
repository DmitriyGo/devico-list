import Router from 'koa-router'
import {
  find,
  create,
  update,
  deleteTodo,
  clearCompleted,
} from '../controllers/todos'
import setJsonContentType from '../middlewares/content-type'
import authMiddleware from '../middlewares/auth'

const router = new Router()

router.prefix('/todos')

router.use(authMiddleware, setJsonContentType)

router.post('/', find)

router.post('/create', create)

router.put('/:id', update)

router.post('/delete', deleteTodo)

router.delete('/clear-completed', clearCompleted)

export default router
