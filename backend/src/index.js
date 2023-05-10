import { config } from 'dotenv'
import setupApp from './app'

config()

setupApp(process.env.PORT || 8000, process.env.SOCKET_PORT || 4000)
