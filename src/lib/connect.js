const mysql = require('mysql2');
console.log(process.env.USER)
const connectionString = {
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DATABASE
};

const pool = mysql.createPool(connectionString);
const promisePool = pool.promise();
module.exports = {
  query: (text, params = []) => promisePool.query(text, params),
}