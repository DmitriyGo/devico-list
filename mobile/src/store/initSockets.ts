import {socketRoutes} from '../helpers'
import socketClient from './socket'

import {RootStore} from './store'
import {Todo, addTodo, clearCompleted, editTodo, deleteTodo} from './todo'

const initSockets = (store: RootStore) => {
  socketClient.on(
    socketRoutes.todoUpdated,
    (data: {item: Todo; active: number; completed: number; total: number}) => {
      store.dispatch(editTodo(data))
    },
  )

  socketClient.on(socketRoutes.addTodo, (data: Todo) => {
    store.dispatch(addTodo(data))
  })

  socketClient.on(socketRoutes.removeTodo, (data: Todo[]) => {
    store.dispatch(deleteTodo(data))
  })

  socketClient.on(socketRoutes.clearCompleted, () => {
    store.dispatch(clearCompleted())
  })
}

export default initSockets
