import { Todo } from '../../entities/todo.js'

const update = async (ctx) => {
  try {
    const id = ctx.params.id
    const userId = ctx.state.user.id

    if (id.length !== 24) {
      ctx.throw(400, 'Wrong id format')
    }

    const foundTodo = await Todo.findById(id)

    if (!foundTodo) {
      ctx.throw(404, 'Todo not found')
    }

    foundTodo.name = ctx.request.body.name
    foundTodo.completed = ctx.request.body.completed

    const updatedTodo = await foundTodo.save()

    const total = await Todo.countDocuments({ user: userId })
    const active = await Todo.countDocuments({ user: userId, completed: false })
    const completed = await Todo.countDocuments({
      user: userId,
      completed: true,
    })

    const data = {
      item: updatedTodo,
      total,
      active,
      completed,
    }

    ctx.emitSocket({ type: 'todoUpdated', payload: data }, ctx.state.user)

    ctx.body = data
  } catch (error) {
    ctx.throw(error)
  }
}

export default update
