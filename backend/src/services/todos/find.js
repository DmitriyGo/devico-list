import { Todo } from '../../entities/todo.js'

const find = async (page, pageSize, sorting, userId) => {
  try {
    const skip = (page - 1) * pageSize
    const limit = pageSize

    const sort = {}

    for (const s of sorting) {
      if (s.field === 'name') {
        sort.name = s.sort === 'desc' ? -1 : 1
      } else if (s.field === 'completed') {
        sort.completed = s.sort === 'desc' ? -1 : 1
      } else if (s.field === 'createdAt') {
        sort.createdAt = s.sort === 'desc' ? -1 : 1
      }
    }

    const items = await Todo.find({ user: userId })
      .sort(sort)
      .skip(skip)
      .limit(limit)

    const total = await Todo.countDocuments({ user: userId })
    const active = await Todo.countDocuments({ user: userId, completed: false })
    const completed = await Todo.countDocuments({
      user: userId,
      completed: true,
    })

    const totalPages = Math.ceil(total / pageSize)

    return {
      items,
      total,
      active,
      completed,
      totalPages,
      currentPage: page,
    }
  } catch (error) {
    throw error
  }
}

export default find
