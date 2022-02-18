const xss = require('xss')
const {
  sqlExecutor
} = require('../db/mysql')
const {
  DB_NAME
} = require('../conf/db')
const {
  buildUUID,
  getYMDHMS,
  toLiteral
} = require('../utils/index')

const getList = async (author, keyword) => {
  let sql = `select * from ${DB_NAME.blogs} where 1=1 `
  if (author) {
    sql += `and author=${author} `
  }
  if (keyword && keyword !== "undefined") {
    sql += `and title like "%${keyword}%" `
  }
  sql += `order by createtime desc;`
  return await sqlExecutor(sql)
}

const getDetail = async (title) => {
  let sql = `select * from ${DB_NAME.blogs} where title="${title}"`
  const result = await sqlExecutor(sql)
  return result[0]
}

const getDetailById = async (contentId) => {
  let sql = `select * from ${DB_NAME.blogs} where contentId='${contentId}'`
  const result = await sqlExecutor(sql)
  return result[0]
}

const newBlog = async (newBlogData) => {
  const title = xss(newBlogData.title)
  const content = toLiteral(xss(newBlogData.content))
  const author = newBlogData.author
  const createtime = getYMDHMS(Date.now())
  const tags = newBlogData.tags
  const contentId = buildUUID()
  const sql = `insert into ${DB_NAME.blogs} (title,content,createtime,author,tags,contentId)
  values ("${title}","${content}","${createtime}","${author}","${tags}","${contentId}");
  `
  console.log("newBlog",sql,newBlogData)
  const result = await sqlExecutor(sql)
  result.insertId = contentId
  return {
    id: result.insertId
  }
}

const updateBlog = async (blogData = {}) => {
  const title = blogData.title
  const content = toLiteral(blogData.content)
  const contentId = blogData.contentId
  const tags = blogData.tags
  if (title && content && contentId) {
    const sql = `update ${DB_NAME.blogs} set title="${title}",tags="${tags}", content="${content}" where contentId="${contentId}";`
    const result = await sqlExecutor(sql)
    return result.affectedRows > 0 ? true : false;
  }
  if (contentId && !title && !content) {
    return getDetailById(contentId)
  }
}


const deleteBlog = async (contentId, author) => {
  const sql = `delete from ${DB_NAME.blogs} where contentId='${contentId}' and author=${author};`
  console.log("deleteBlog",sql,author)
  const result = await sqlExecutor(sql)
  return result.affectedRows > 0 ? true : false
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog,
  getDetailById
}