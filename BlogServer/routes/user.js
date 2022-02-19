const {
  login,
  register
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
  const result = await login(username, password)
  if (result.username) {
    ctx.session.username = result.username
    ctx.session.realname = result.realname
    ctx.body = new SuccessModel()
    return;
  }
  ctx.body = new ErrorModel('登录失败！')
})

router.post('/register',async (ctx, next)=>{
  const {
    username,
    password
  } = ctx.request.body
  const result = await register(username, password)
  if(result){
    ctx.body = new SuccessModel()
    return
  }
  ctx.body = new ErrorModel('注册失败！')
})

router.get('/session-test', async (ctx, next) => {
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