import { Todo } from '../../entities/todo.js'

const create = async (ctx) => {
  try {
    const userId = ctx.state.user.id

    const todoData = {
      ...ctx.request.body,
      user: userId,
    }

    const createdTodo = await Todo.create(todoData)

    ctx.emitSocket({ type: 'listUpdated' }, ctx.state.user)

    ctx.status = 201
    ctx.body = createdTodo
  } catch (error) {
    ctx.throw(error)
  }
}

export default create
