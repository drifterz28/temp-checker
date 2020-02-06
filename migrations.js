require('dotenv').config();
const mysql = require('mysql2');
const migration = require('mysql-migrations');

const connection = mysql.createPool({
  connectionLimit : 10,
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DATABASE
});

migration.init(connection, __dirname + '/migrations');

// node migrations.js add migration create_table_users
// node migrations.js up
// node migrations.js add seed create_table_users