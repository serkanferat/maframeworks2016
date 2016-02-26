var express = require('express');
var router = express.Router();

router.get('/partials/:partialPath', function (req, res) {
  res.render('partials/' + req.params.partialPath);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* get login page */
router.get("/login", function(req, res) {
  res.render("login", { title: "Login" });
});

/* get register page */
router.get("/register", function(req, res) {
  res.render("register", { title: "Register" });
});

module.exports = router;
