// require('dotenv').config()
module.exports = {
  development: {
    username: "ewallet",
    password: "ewallet",
    database: "ewallet",
    host: "0.0.0.0",
    port: "3307",
    dialect: 'mysql'
  }
//   test: {
//     username: process.env.DB_MYSQL_USERNAME,
//     password: process.env.DB_MYSQL_PASSWORD,
//     database: process.env.DB_MYSQL_DATABASE,
//     host: process.env.DB_MYSQL_HOST,
//     port: process.env.DB_MYSQL_PORT,
//     dialect: 'mysql'
//   },
//   production: {
//     username: process.env.DB_MYSQL_USERNAME,
//     password: process.env.DB_MYSQL_PASSWORD,
//     database: process.env.DB_MYSQL_DATABASE,
//     host: process.env.DB_MYSQL_HOST,
//     port: process.env.DB_MYSQL_PORT,
//     dialect: 'mysql'
//   }
};