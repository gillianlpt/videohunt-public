// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('static-favicon');
var passport = require('passport');
var flash    = require('connect-flash');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');

var dbConfig = require('./config/database.js');
var authConfig = require('./config/auth.js');
var cors = require('cors');

// configuration ===============================================================
mongoose.connect(dbConfig.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(logger('dev')); // log every request to the console
app.use(cookieParser('ilovescotchandvideos')); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon());

app.use(cors());
app.set('view engine', 'ejs'); // set up ejs for templating
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));


// required for passport
app.use(session({
  secret: 'ilovescotchandvideos',
  resave: true,
  saveUninitialized: true,
  cookie: {expires: false}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes ======================================================================
var routes = require('./routes/index')(app, passport);


// var users = require('./routes/users');

// app.use('/', routes);
// app.use('/users', users);



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

// Check if user is authenticated
app.use(function (req, res, next) {
  res.locals.login = req.isAuthenticated();
  next();
});

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
