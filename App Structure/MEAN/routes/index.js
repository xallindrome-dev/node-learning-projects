var express = require('express');
var router = express.Router();

var people = [
  {
      name: "Me"
  }, 
  {
      name: "You"
  }, 
  {
      name: "Us"
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', serverPeople: people });
});

module.exports = router;
