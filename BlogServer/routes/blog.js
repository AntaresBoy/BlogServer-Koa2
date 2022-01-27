const loginCheck = require('../middleware/loginCheck')
const {
  ErrorModel,
  SuccessModel
} = require('../model/resModel')
const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controllor/blog')
const router = require('koa-router')()

router.prefix('/api/blog')
router.get('/list', loginCheck, async (ctx, next) => {
  let author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''
  if (ctx.query.isadmin) {
    if (ctx.session.username == null) {
      ctx.body = new ErrorModel('未登录')
      return;
    }
    author = ctx.session.username
  }
  const result = await getList(author, keyword)
  console.log("list-----result:", result)
  ctx.body = new SuccessModel(result)
})

router.get('/detail', loginCheck, async (ctx, next) => {
  const result = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(result)
})

router.post('/new', loginCheck, async (ctx, next) => {
  const body = ctx.request.body
  body.author = ctx.session.username
  const result = await newBlog(body)
  ctx.body = new SuccessModel(result)
})

router.post('/update', loginCheck, async (ctx, next) => {
  const result = await updateBlog(ctx.query.id, ctx.request.body)
  ctx.body = result ? new SuccessModel(result) : new ErrorModel('更新博客失败')
})


router.post('del', loginCheck, async (ctx, next) => {
  const author = ctx.session.username
  const result = await deleteBlog(ctx.query.id, author)
  ctx.body = result ? new SuccessModel(result) : new ErrorModel('删除博客失败')
})


module.exports = router