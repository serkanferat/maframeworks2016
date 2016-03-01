var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Users = require('../../../src/models/users');

module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        function (username, password, done) {

		Users.findOne(
			{username: username},
			function (err, results) {
                        if (results.password === password) {
                            var user = results;
                            done(null, user);
                        } else {
                            done(null, false, {message: 'Bad password', username: username});
                        }

                    });
        }));
};