const setJsonContentType = async (ctx, next) => {
  ctx.type = 'application/json'
  await next()
}

export default setJsonContentType
