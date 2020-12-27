var Todos = require("../models/todoModel");

module.exports = function(app) {

    app.get("/api/setupTodos", function(req, res) {
        // seed db - can do this automatically (json-generator.com)
        var startTodos = [
            {
                username: "Test",
                todo: "Buy milk",
                isDone: false,
                hasAttachment: false
            },
            {
                username: "Test",
                todo: "Feed dog",
                isDone: false,
                hasAttachment: false
            },
            {
                username: "Test",
                todo: "Learn Node",
                isDone: false,
                hasAttachment: false
            },
        ];

        Todos.create(startTodos, function(err, results) {
            res.send(results);
        });
    });

}