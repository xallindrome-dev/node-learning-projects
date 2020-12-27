var express = require("express");
var app = express();
//var mysql = require("mysql");

var apiController = require("./controllers/apiController");
var htmlController = require("./controllers/htmlController");

var port = process.env.PORT || 3000;

app.use("/assets", express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.use("/", function(req, res, next) {
    console.log(`Request Url: ${req.url}`);
    
    // connecting to mysql
    // var connection = mysql.createConnection({
    //     host: "localhost",
    //     user: "test",
    //     password: "test",
    //     database: "addressbook"
    // });

    // connection.query("Select statement", function(err, rows) {
    //     if(err) throw err;
    //     console.log(rows); // rows is an array with objects
    // });
    // can even stream rows!!
    
    next(); // run the next middle ware
});

htmlController(app);

apiController(app);

app.listen(port);