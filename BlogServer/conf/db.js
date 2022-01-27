const env = process.env.NODE_ENV
let MYSQL_CONF
let REDIS_CONF
const DB_NAME = {
  users: 'ids_users',
  blogs: 'ids_blogs'
}
//开发环境数据库信息
if (env === 'dev') {
  MYSQL_CONF = {
    host: "10.7.235.231",
    user: "root",
    password: "Ids@132132",
    port: 3305,
    database: 'ids_test'
  }
  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1"
  }
}

//线上数据库链接信息
if (env === 'production') {
  MYSQL_CONF = {
    host: "10.7.235.231",
    user: "root",
    password: "Ids@132132",
    port: 3305,
    database: 'ids_test'
  }

  REDIS_CONF = {
    port: 6379,
    host: "127.0.0.1"
  }
}

module.exports = {
  MYSQL_CONF,
  DB_NAME,
  REDIS_CONF
}