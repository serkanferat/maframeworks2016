var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
var flash = require('express-flash');

var app = express();

// ---------------------------------------
// Views
// ---------------------------------------
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'jade');

// ---------------------------------------
// Middleware
// ---------------------------------------
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'OJO90y7hHGIGfdlaRHW535asu648rsHTWHszr'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// ---------------------------------------
// Auth/Passport
// ---------------------------------------
require('./src/config/passport')(app);

// ---------------------------------------
// Routes
// ---------------------------------------
var baseRouter = require('./src/routes/baseRouter');
var userRouter = require('./src/routes/userRouter');
var authRouter = require('./src/routes/authRouter');
var postRouter = require('./src/routes/postRouter');
var tagRouter = require('./src/routes/tagRouter');
var categoryRouter = require('./src/routes/categoryRouter');
var forgotRouter = require('./src/routes/forgotRouter');
var resetRouter = require('./src/routes/resetRouter');

app.use('/', baseRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/api/posts/', postRouter);
app.use('/api/tags/', tagRouter);
app.use('/api/categories/', categoryRouter);
app.use('/forgot/', forgotRouter);
app.use('/reset/', resetRouter);
// ---------------------------------------
// Database
// ---------------------------------------

//mongoose.connect('mongodb://localhost/CMS');
 mongoose.connect('mongodb://nikolay:1234@ds011810.mlab.com:11810/projectcms');


// ---------------------------------------
// catch 404 and forward to error handler
// ---------------------------------------
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
app.listen(3000);
