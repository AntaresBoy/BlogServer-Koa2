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
  return result[0] || {}
}

module.exports = {
  login
}