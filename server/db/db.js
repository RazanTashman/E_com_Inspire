var  mysql = require("mysql");

var con = mysql.createPool({
  host: "us-cdbr-east-03.cleardb.com",
  user: "b05eada11a7eae",
  password: "b3e79710",
  database: "heroku_74ee3b87e216b3b",
});

con.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
module.exports = con;