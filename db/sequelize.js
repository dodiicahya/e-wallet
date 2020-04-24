require('dotenv').config()
module.exports = {
  development: {
    username: process.env.DB_MYSQL_USERNAME,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE,
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT,
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_MYSQL_USERNAME,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE,
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_MYSQL_USERNAME,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DATABASE,
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT,
    dialect: 'mysql'
  }
};