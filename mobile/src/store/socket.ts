import io from 'socket.io-client'
import {PUBLIC_SOCKETS_URL} from '../helpers/constants'

const sockets = io(PUBLIC_SOCKETS_URL, {
  transports: ['websocket'],
})

export default sockets
