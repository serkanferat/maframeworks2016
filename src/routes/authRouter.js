var express = require('express');
var authRouter = express.Router();
var passport = require('passport');
var Users = require('../../src/models/users');
var mongoose = require('mongoose');

authRouter.get('/register', function(req, res, next) {
  res.render('register', { title: 'Sign up' });
});
authRouter.route('/register').post(function (req, res) {
	
		mongoose.createConnection('localhost', 'CMS');
		var user = {
			username: req.body.userName,
			password: req.body.password
		};
		
		if (req.body.password !== req.body.repeatPassword){
			console.log(user.username );
			return res.render('register', {
				title: 'Sign up',
				message: "Passwords doesn't match!",
				userName: user.username 
			});

		};
		var newUser = new Users(user);
		newUser.save(function (err, results) {
		if (err) return handleError(err);
			req.login(results, function () {
				res.redirect('/auth/profile');
			});
		});
		
});

authRouter.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

authRouter.route('/login')
	.post(passport.authenticate('local', {
		failureRedirect: '/auth/login'
	}), function (req, res) {
		res.redirect('/auth/profile');
	});


authRouter.route('/profile')
	.all(function (req, res, next) {
		if (!req.user) {
			res.redirect('/');
		}
		next();
	})
	.get(function (req, res) {
		res.json(req.user);
	});


module.exports = authRouter;