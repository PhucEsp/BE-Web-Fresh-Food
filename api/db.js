'use strict';
const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "Fruit"
});

module.exports = db