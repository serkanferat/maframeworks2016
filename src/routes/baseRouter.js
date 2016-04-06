var express = require('express');
var baseRouter = express.Router();



/* GET home page. */
baseRouter.get('/', function(req, res, next) {
  console.log(req.user);
  res.render('index', { user: req.user });
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

baseRouter.get('/tags/:tagid', function(req, res, next) {
  res.render('tag-edit', { tagid: req.params.tagid });
});

baseRouter.get('/categories/:categoryid', function(req, res, next) {
    res.render('category-edit', { categoryid: req.params.categoryid });
});

baseRouter.get('/forgot', function(req, res, next) {
    res.render('forgot', { user:req.user});
});

baseRouter.get('/reset/:token', function(req, res, next) {
    res.render('reset', { user:req.user});
});

module.exports = baseRouter;
