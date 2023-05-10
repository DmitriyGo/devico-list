const socketsMiddleware = (io) => {
  return async (ctx, next) => {
    ctx.emitSocket = (action, creator) => {
      io.to(creator.id).emit(action.type, action.payload)
    }

    await next()
  }
}

export default socketsMiddleware
