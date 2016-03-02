var express = require('express');
var baseRouter = express.Router();



/* GET home page. */
baseRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

baseRouter.get('/admin', function(req, res, next) {

   if (req.user && req.user.group === "admin"){
         res.render('admin');
   }
  else{
      res.send(401, 'Unauthorized');
    };

});

baseRouter.get('/admin/:userid', function(req, res, next) {

  res.render('admin-edit', { userid: req.params.userid });
});


baseRouter.get('/posts/:postid', function(req, res, next) {
  res.render('post-edit', { postid: req.params.postid });
});

module.exports = baseRouter;
