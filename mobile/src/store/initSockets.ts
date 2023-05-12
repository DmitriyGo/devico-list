import {socketRoutes} from '../helpers'
import socketClient from './socket'

import {RootStore} from './store'
import {Todo, editTodo} from './todo'

const initSockets = (store: RootStore) => {
  socketClient.on(
    socketRoutes.todoUpdated,
    (data: {item: Todo; active: number; completed: number; total: number}) => {
      store.dispatch(editTodo(data))
    },
  )
}

export default initSockets
