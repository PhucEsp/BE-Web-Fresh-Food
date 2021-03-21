'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "trong",
  password: process.env.DB_PASS || "trong123",
  database: process.env.DB_NAME || "Fruit"
});

module.exports = db