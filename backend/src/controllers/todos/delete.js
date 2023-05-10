import { Todo } from '../../entities/todo.js'

const deleteTodo = async (ctx) => {
  try {
    const userId = ctx.state.user.id
    let ids = ctx.request.body.ids

    if (!Array.isArray(ids)) {
      ids = [ids]
    }

    if (ids.some((id) => id.length !== 24)) {
      ctx.throw(400, 'Wrong id format')
    }

    const deletedTodos = await Promise.all(
      ids.map((id) => Todo.findOneAndDelete({ _id: id, user: userId })),
    )

    console.log(ids)

    ctx.emitSocket({ type: 'listUpdated' }, ctx.state.user)

    ctx.body = deletedTodos
  } catch (error) {
    ctx.throw(error)
  }
}

export default deleteTodo
