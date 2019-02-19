var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require('express-session');
const flash = require('express-flash');


// DB setup
const mongoose = require("mongoose");
const db = require("./config/database-local");

// Dataase Connection
mongoose.connect(db.mongoUri, { useNewUrlParser: true }).then(() => {
  console.log("DB Started");
}, (err) => {
  throw err;
});

// Adding Passport configuration
require('./config/passport')(passport);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ordersRouter = require('./routes/orders');
var buyersRouter = require('./routes/buyers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Express Session Middleware Without the Session middleware the req.user cannot persist
app.use(session({
  secret: 'salluerpwalasecret',
  resave: true,
  saveUninitialized: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Set Local Variables
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/orders', ordersRouter);
app.use('/buyers', buyersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
