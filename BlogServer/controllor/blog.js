const xss = require('xss')
const {
  sqlExecutor
} = require('../db/mysql')
const {
  DB_NAME
} = require('../conf/db')
const getList = async (author, keyword) => {
  let sql = `select * from ${DB_NAME.blogs} where 1=1 `
  if (author) {
    sql += `and author=${author} `
  }
  if (keyword && keyword !== "undefined") {
    console.log("xxxxx", keyword)
    sql += `and title like "%${keyword}%" `
  }
  sql += `order by createtime desc;`
  console.log("sql*******", sql)
  return await sqlExecutor(sql)
}

const getDetail = async (title) => {
  let sql = `select * from ${DB_NAME.blogs} where title="${title}"`
  console.log("getDetail0000", sql)
  const result = await sqlExecutor(sql)
  console.log("getDetail", result, sql)
  return result[0]
}

const newBlog = async (newBlogData) => {
  const title = xss(newBlogData.title)
  const content = xss(newBlogData.content)
  const author = newBlogData.author
  const createtime = Date.now()
  const sql = `insert into ${DB_NAME.blogs} (title,content,createtime,author)
  values ('${title}','${content}','${createtime}','${author}');
  `
  const result = await sqlExecutor(sql)
  return {
    id: result.insertId
  }
}

const updateBlog = async (id, blogData = {}) => {
  const title = blogData.title
  const content = blogData.content
  const sql = `update tfs_info_test set title=${title} where tfsid=${id};`
  const result = await sqlExecutor(sql)
  return result.affectedRows > 0 ? true : false;
}

const deleteBlog = async (id, blogData = {}) => {
  const title = blogData.title
  const sql = `delete from tfs_info_test where tfsid=${id} and title=${title}`
  const result = await sqlExecutor(sql)
  return result.affectedRows > 0 ? true : false
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}