var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var registerSuccessRouter = require('./routes/register-success');
var welcomeRouter = require('./routes/welcome');
var loginRouter = require('./routes/login');
var loginSuccessRouter = require('./routes/login-success');
var userListRouter = require('./routes/user-list');
var editUserRouter = require('./routes/user-list/edit-user');
var chatRouter = require('./routes/chat');
var docsListRouter = require('./routes/docs-list');
var shareRouter = require('./routes/docs-list/share');
var logoutRouter = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/welcome', welcomeRouter); // localhost:3000/welcome
app.use('/login', loginRouter); // localhost:3000/login
app.use('/register', registerRouter); // localhost:3000/register
app.use('/login-success', loginSuccessRouter); // localhost:3000/loginSuccess
app.use('/register-success', registerSuccessRouter); // localhost:3000/registerSuccess
app.use('/user-list', userListRouter); // localhost:3000/user-list
app.use('/user-list/edit-user', editUserRouter); // localhost:3000/user-list/edit-user
app.use('/chat', chatRouter); // localhost:3000/chat
app.use('/docs-list', docsListRouter); // localhost:3000/docs-list
app.use('/docs-list/share', shareRouter); // localhost:3000/docs-list/share
app.use('/logout', logoutRouter); // localhost:3000/login



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
