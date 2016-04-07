var express = require('express');
var userRouter = express.Router();
var Users = require('../../src/models/users');
var Posts = require('../../src/models/posts');
var mongoose = require('mongoose');


var async = require('async');


/* GET users listing. */
userRouter.get('/', function(req, res, next) {
Users.find({}).exec(function (err, users) {
       res.send(users);
});
});

/* Create user */
userRouter.route('/').post(function (req, res) {
	
	//	mongoose.createConnection('localhost', 'CMS');
		var user = {
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
            group: req.body.group,
		};
	
		if (typeof req.body.username === "undefined" || typeof req.body.password === "undefined"|| typeof req.body.group === "undefined" || typeof req.body.email === "undefined")
		{
			res.json({message:"Error"});
		}else
		{
		var newUser = new Users(user);
		newUser.save(function (err, user) {
			if (err) res.json({message:"Error"});
			res.json(user);
		});
		}
		
});

/* Get user */
userRouter.get('/:userid', function(req, res, next) {
	var userid = req.params.userid;
	Users.findOne({_id:userid},function (err, results){res.json(results);});
	
});

/* Update user */
userRouter.put('/:userid', function(req, res, next) {
	var userid = req.params.userid;
	
	Users.findById(userid, function (err, user) {
		if (err) res.json({message:"Error"});

		user.username = req.body.username;
		user.password = req.body.password;
		user.password = req.body.email;
		
		user.save(function (err) {
		if (err) res.json({message:"Error"});
			res.send(user);
		});
	});
	
});

/* Delete user */
userRouter.delete('/:userid', function(req, res, next) {
	var userid = req.params.userid;
	Users.remove({ _id:userid }, function (err)
		{
		if (err) res.json({message:"Error"});
		res.json({message:"Succes"});
		}
	);
});


module.exports = userRouter;
