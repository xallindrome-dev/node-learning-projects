var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

module.exports = function(app) {
    app.get("/api/person/:id", function(req, res) {
        // get data from database
        res.json({
            firstname: "Andrew",
            lastname: "Wilson"
        });
    });
    
    app.post("/api/person", jsonParser, function(req, res) {
       // save to the database
    });
    
    app.delete("/api/person/:id", function(req, res) {
        // delete from the database
    });
}