const {
  login
} = require('../controllor/user')
const {
  ErrorModel,
  SuccessModel
} = require('../model/resModel')
const router = require('koa-router')()
router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
  const {
    username,
    password
  } = ctx.request.body
  console.log("login", username, password)
  const result = await login(username, password)
  console.log("result", result)
  if (result.username) {
    ctx.session.username = result.username
    ctx.session.realname = result.realname
    console.log("result1111", ctx.session)
    ctx.body = new SuccessModel()
    return;
  }
  ctx.body = new ErrorModel('登录失败')
})

router.get('/session-test', async (ctx, next) => {
  console.log("session-test", ctx.session)
  if (ctx.session.viewCount == null) {
    ctx.session.viewCount = 0
  }
  ctx.session.viewCount++
  ctx.body = {
    errno: 0,
    viewCount: ctx.session.viewCount
  }
})

module.exports = router