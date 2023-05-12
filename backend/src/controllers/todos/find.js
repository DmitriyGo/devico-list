import findService from '../../services/todos/find'

const find = async (ctx) => {
  try {
    const userId = ctx.state.user.id

    const page = parseInt(ctx.request.body.page) || 1
    const pageSize = parseInt(ctx.request.body.pageSize) || 10

    const skip = parseInt(ctx.request.body.skip) || null

    const sorting = ctx.request.body.sorting || []

    ctx.body = await findService(page, pageSize, skip, sorting, userId)
  } catch (error) {
    ctx.throw(error)
  }
}

export default find
