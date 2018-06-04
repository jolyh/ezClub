/*  Database  */
// DB connection setup
const mysql = require('mysql');

var con = mysql.createConnection({
  host:     "localhost",
  user:     "root",
  password: "",
  database: "bbd2",
});

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
