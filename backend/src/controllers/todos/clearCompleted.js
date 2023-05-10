import { Todo } from '../../entities/todo.js'

const clearCompleted = async (ctx) => {
  try {
    const userId = ctx.state.user.id
    const todos = await Todo.deleteMany({ user: userId, completed: true })

    ctx.emitSocket(userId, 'listUpdated')

    ctx.body = todos
  } catch (error) {
    ctx.throw(error)
  }
}

export default clearCompleted
