var Users = require('../../src/models/users');
var express = require('express');
var forgotRouter = express.Router();
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
var flash = require('express-flash');



forgotRouter.post('/', function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            Users.findOne({ email: req.body.email }, function(err, user) {
                console.log( req.body);

                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    return res.redirect('/forgot');
                }
                console.log(user.email);
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour


                user.save(function(err) {
                    done(err, token, user);
                });
                console.log(user.resetPasswordToken);
            });
        },
        function(token, user, done) {
            var defaultTransport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'serkytest@gmail.com',
                    pass: 'rema1000'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'passwordreset@demo.com',
                subject: 'Node.js Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            defaultTransport.sendMail(mailOptions, function(err) {
                req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/forgot');
    });
});

module.exports = forgotRouter;
