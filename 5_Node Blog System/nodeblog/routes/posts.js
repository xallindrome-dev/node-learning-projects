var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './public/images' });

var mongo = require("mongodb");
var db = require("monk")("localhost/nodeblog");

router.get('/show/:id', function(req, res, next) {
    var posts = db.get("posts");
    
    console.log(req.params.id);
    posts.findOne({ _id: req.params.id }, {}, function(err, post) {
      res.render("show", {
          post: post
      });
    });  
  });

router.get('/add', function(req, res, next) {
  var categories = db.get("categories");

  categories.find({}, {}, function(err, categories) {
    res.render("addpost", {
        title: "Add Post",
        categories: categories
    });
  });  
});

router.post('/add', upload.single("mainimage"), function(req, res, next) {
    // Get Form Values
    var title = req.body.title;
    var category = req.body.category;
    var body = req.body.body;
    var author = req.body.author;
    var date = new Date();
    var mainimage;

    // Check Image Upload
    if(req.file) {
        mainimage = req.file.filename;
    } else {
        mainimage = "noimage.jpg";
    }
    
    // Form Validation
    req.checkBody("title", "Title field is required").notEmpty();
    req.checkBody("body", "Body field is required").notEmpty();

    // Check Errors
    var errors = req.validationErrors();

    if(errors) {
        res.render("addpost", {
            errors: errors
        });
    } else {
        var posts = db.get("posts");
        posts.insert({
            title: title,
            category: category,
            body: body,
            author: author,
            date: date,
            mainimage: mainimage
        }, function(err, post) {
            if(err) {
                res.send(err);
            } else {
                req.flash("success", "Post Added");
                res.location("/");
                res.redirect("/");
            }
        });
    }
  });

  router.post('/addcomment', function(req, res, next) {
    // Get Form Values
    var id = req.body.postid;
    var name = req.body.name;
    var email = req.body.email;
    var body = req.body.body;
    var commentDate = new Date();
    
    // Form Validation
    req.checkBody("name", "Name field is required").notEmpty();
    req.checkBody("email", "Email field is required but never displayed").notEmpty();
    req.checkBody("email", "Email is not formatted properly").isEmail();
    req.checkBody("body", "Body field is required").notEmpty();

    // Check Errors
    var errors = req.validationErrors();

    if(errors) {
        var posts = db.get("posts");
        posts.findOne({ _id: id }, {}, function(errors, post) {
            res.render("show", {
                errors: errors,
                post: post
            });
        });        
    } else {
        var comment = {
            name: name,
            email: email,
            body: body,
            date: commentDate
        };

        var posts = db.get("posts");
        posts.update({
            "_id": id
        }, {
            $push: {
                comments: comment
            }
        }, function(error, doc) {
            if(error) {
                throw error;
            } else {
                req.flash("success", "Comment Added");
                res.location(`/posts/show/${id}`);
                res.redirect(`/posts/show/${id}`);
            }
        });
    }
  });

module.exports = router;
