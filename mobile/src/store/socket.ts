import io from 'socket.io-client'

const sockets = io('http://localhost:4000', {
  transports: ['websocket'],
})

export default sockets
