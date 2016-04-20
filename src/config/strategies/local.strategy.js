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
                        if (results === null) {
                            return done(null, false, {message: 'Error - No User!'});
                        }
                        else if (results.password === password) {
                            var user = results;
                            return done(null, user);
                        } else {
                            return done(null, false, {message: 'Bad password', username: username});
                        }

                    });
        }));
};