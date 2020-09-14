var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var cors = require('cors')
var app = express();

// Db connect =================
// require('./config/database');

// mongodb://<dbuser>:<dbpassword>@ds235418.mlab.com:35418/appointments

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongadmin:mongadmin1234@ds235418.mlab.com:35418/appointments', {
  // useMongoClient: true
});


// define model =================
require('./models/appointmentModel');
require('./models/slotModel');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// routes ======================================================================
require('./routes/appointmentRoutes')(app);
require('./routes/slotRoutes')(app);

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