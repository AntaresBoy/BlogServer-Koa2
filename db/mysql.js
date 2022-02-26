const mysql = require('mysql')
const {
  MYSQL_CONF
} = require('../conf/db')

const con = mysql.createConnection(MYSQL_CONF)
con.connect

//执行sql查询
function sqlExecutor(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
  return promise
}

module.exports = {
  sqlExecutor,
  escape: mysql.escape //防止sql注入
}