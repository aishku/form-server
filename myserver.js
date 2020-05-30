var http = require("http");
var fs = require("fs");
var mysql = require("mysql");
const DB_NAME = "students";
const TABLE_NAME = "profile";

var con;

function createDatabaseAndTable() {
  con = mysql.createConnection({
    host: "localhost",
    user: "aish",
    password: "aish"
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE IF NOT EXISTS " + DB_NAME, function(
      err,
      result
    ) {
      if (err) throw err;
      console.log("Database created");
      con.end();
      console.log("Disconnected");
      createTable();
    });
  });
}

function createTable() {
  con = mysql.createConnection({
    host: "localhost",
    user: "aish",
    password: "aish",
    database: DB_NAME
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected Again!");
    con.query(
      "CREATE TABLE IF NOT EXISTS " +
        TABLE_NAME +
        "(name varchar(50), age TINYINT, about varchar(300))",
      function(err, result) {
        if (err) throw err;
        console.log("Table created");
      }
    );
  });
}

createDatabaseAndTable();

http
  .createServer(function(req, res) {
    fs.readFile("formpage.html", function(err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8081);
