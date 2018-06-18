/*  Database  */
// DB connection setup
const mysql = require('mysql');

// localhost
var con = mysql.createConnection({
  host:     "localhost",
  user:     "root",
  password: "",
  database: "bbd2",
});

/*
var con = mysql.createConnection({
  host:     "db4free.net",
  port:     "3306",
  user:     "bbdapp",
  password: "f.*dIL8d",
  database: "bbdapp",
});
*/
// Check db connection

con.connect((err) => {
  if (err) {
    console.log('Error connecting to DB');
    console.log(err);
    return;
  }
  console.log('Connection established');
});

module.exports = con;
