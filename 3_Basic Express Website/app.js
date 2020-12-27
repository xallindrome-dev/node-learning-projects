var express = require("express");
var path = require("path"); // root module
var bodyParser = require("body-parser");
var nodeMailer = require("nodemailer");

var port = 3000;

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
    //res.send("Hello World!");
    res.render("index", {title: "Computer Not Working?"});
});

app.get("/about", function(req, res) {
    res.render("about");
});

app.get("/contact", function(req, res) {
    res.render("contact");
});

app.post("/contact/send", function(req, res) {
    var transporter = nodeMailer.createTransport({
        service: "Gmail",
        auth: {
            user: "andrew.w.wilson.aww@gmail.com",
            pass: "$@nc1f1c@!!0n"
        }
    });

    var mailOptions = {
        from: "Andrew Wilson <andrew.w.wilson.aww@gmail.com>",
        to: "Andrew Wilson <andrew.w.wilson.aww@gmail.com>",
        subject: "Website Submission",
        text: "You have a submission with the following details... Name: " + req.body.name + " Email: " + req.body.email + " Message: " + req.body.message,
        html: "<p>You have a submission with the following details...</p><ul><li>Name: " + req.body.name + "</li><li>Email: " + req.body.email + "</li><li>Message: " + req.body.message + "</li></ul>"
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if(error) {
            console.log(error);
            res.redirect("/");
        } else {
            console.log("Message Sent: " + info.response);
            res.redirect("/")
        }
    });
});

app.listen(port);
console.log("Server is running on port: " + port);

