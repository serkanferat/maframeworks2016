var express = require('express');
var postRouter = express.Router();
var Posts = require('../../src/models/posts');
var mongoose = require('mongoose');

/* GET posts listing. */
postRouter.get('/', function(req, res, next) {
	Posts.find(function (err, results){res.send(results);});
	
});

///* Create post */
postRouter.route('/').post(function (req, res) {
	
		mongoose.createConnection('localhost', 'CMS');
		console.log(req.body);

	
		if (typeof req.body.title === "undefined" || typeof req.body.content === "undefined")
		{
			res.json({message:"Error"});
		}else{
		var newPost = new Posts(req.body);
		newPost.save(function (err, post) {
			if (err) res.json({message:"Error"});
			res.json(post);
		});
		}
		
});

///* Get post */
postRouter.get('/:postid', function(req, res, next) {
	var postid = req.params.postid;
	Posts.findOne({_id:postid},function (err, results){res.json(results);});
	
});
//
/* Update post */
postRouter.put('/:postid', function(req, res, next) {
	var postid = req.params.postid;
	
	Posts.findById(postid, function (err, post) {
		if (err) res.json({message:"Error"});
		post.title = req.body.title;
		post.content = req.body.content;
		post.save(function (err) {
		if (err) res.json({message:"Error"});
			res.send(post);
		});
	});
	
});
//
/* Delete post */
postRouter.delete('/:postid', function(req, res, next) {
	var postid = req.params.postid;
	Posts.remove({ _id:postid }, function (err)
		{
		if (err) res.json({message:"Error"});
		res.json({message:"Succes"});
		}
	);
});


module.exports = postRouter;
