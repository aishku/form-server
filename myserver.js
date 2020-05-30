var http = require("http");
var fs = require("fs");
var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
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
        "(id int NOT NULL PRIMARY KEY AUTO_INCREMENT, name varchar(50), age TINYINT, about varchar(300))",
      function(err, result) {
        if (err) throw err;
        console.log("Table created");
      }
    );
  });
}

createDatabaseAndTable();

// http
//   .createServer(function(req, res) {
//     console.log(req);
//     fs.readFile("formpage.html", function(err, data) {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       res.write(data);
//       return res.end();
//     });
//   })
//   .listen(8081);

var app = express();

app.get("/", function(req, res) {
  fs.readFile("formpage.html", function(err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

app.get("/xyz", function(req, res) {
  res.send("xyz path");
});

app.get("/aish", function(req, res) {
  res.send("aish path");
});

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static("public"));

app.post("/createstudent", function(req, res) {
  console.log(req.body);
  con.query(
    "INSERT INTO " +
      TABLE_NAME +
      "(name, age, about) VALUES ('" +
      req.body.sname +
      "'," +
      req.body.sage +
      ",'" +
      req.body.sdesc +
      "');",
    function(err, result) {
      if (err) throw err;
      console.log("Inserted entry");
      res.send("Inserted");
    }
  );
});

app.listen(8081);
