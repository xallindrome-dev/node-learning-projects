var http = require("http");
var fs = require("fs");

// http.createServer(function(req, res) {
//     res.writeHead(200, {
//         "Content-Type": "text/html"
//     });
//     var html = fs.readFileSync(__dirname + "/index.htm", "utf8");
//     var message = "Hello all worldly entities!";
//     html = html.replace("{Message}", message);
//     res.end(html);

// }).listen(1337, "127.0.0.1");

// Performat with Streams
http.createServer(function(req, res) {

    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    fs.createReadStream(__dirname + "/index.htm").pipe(res); // sending it a chunk at a time

}).listen(1337, "127.0.0.1");