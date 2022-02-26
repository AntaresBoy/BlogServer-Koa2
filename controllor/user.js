const {
  sqlExecutor,
  escape
} = require('../db/mysql')
const {
  DB_NAME
} = require('../conf/db')
const {
  genPassword
} = require('../utils/cryp')

const login = async (username, password) => {
  username = escape(username)
  password = escape(genPassword(password))
  const sql = `select username, password from ${DB_NAME.users} where username=${username} and password=${password};`
  const result = await sqlExecutor(sql)
  console.log("11111", username, password, result)
  return result[0] || {}
}

const register = async (username, password) => {
  username = escape(username)
  password = escape(genPassword(password))
  const realname = ""
  const sql = `insert into ${DB_NAME.users} (username, password,realname) values (${username},${password},"${realname}");`
  console.log("register:", sql)
  const result = await sqlExecutor(sql)
  console.log("result:", result)
  return result.affectedRows > 0 ? true : false;
}

module.exports = {
  login,
  register
}