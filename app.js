var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// add dependencies: passport, passport-local, express-session, connect-flash
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

// Initialize passport variables
var passportConfig = require('./config/passport');

var account_routes = require('./routes/account');
var index_routes = require('./routes/index');
var login_routes = require('./routes/login');
var logout_routes = require('./routes/logout');
var register_routes = require('./routes/register');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//NOTE: don't move this down than here.. will cause blank database requests
// by passport middleware sitting below
app.use(express.static(path.join(__dirname, 'public')));

// setup the flash message middleware
app.use(flash());

// setup the session middleware
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());

// specify controllers to handle various routes
app.use('/account', account_routes);
app.use('/', index_routes);
app.use('/login', login_routes);
app.use('/logout', logout_routes);
app.use('/register', register_routes);

// catch 404 and forward to error handler
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
            user: req.user,
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
