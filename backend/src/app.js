import koa from 'koa'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import logger from 'koa-logger'
import cors from 'koa-cors'
import sockets from 'socket.io'

import todoRouter from './routes/todo-router.js'
import authRouter from './routes/auth-router.js'
import connectToMongo from './helpers/connect.js'
import { errorHandler } from './middlewares/error-handling.js'
import socketsMiddleware from './middlewares/sockets.js'

const setupApp = (port, socketPort) => {
  const app = new koa()
  const io = sockets(socketPort)

  connectToMongo()

  app.use(logger())
  app.use(bodyParser())
  app.use(helmet())
  app.use(
    cors({
      credentials: true,
      origin: process.env.PUBLIC_CLIENT_URL,
    }),
  )

  app.use(socketsMiddleware(io))

  app.use(todoRouter.routes())
  app.use(todoRouter.allowedMethods())

  app.use(authRouter.routes())
  app.use(authRouter.allowedMethods())

  app.on('error', errorHandler)

  io.on('connection', (socket) => {
    socket.on('login', (data) => {
      socket.join(data.id)
    })

    socket.on('logout', (data) => {
      socket.leave(data.id)
    })
  })

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  })
}

export default setupApp
