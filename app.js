var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const hbs = require('hbs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const { body, validationResult } = require('express-validator');
const methodOverride = require('method-override');
var app = express();

//mongoose connection
require('dotenv').config();//pass in your sensative info into the .env file so that your info is protected.
mongoose.connect(process.env.DB_URI,  {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then( (res) => console.log('db connected'))
    .catch((err) => console.log(err));

// passport config
app.use(require('express-session')({
  secret: process.env.EXP_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var User = require('./models/user');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//unauthorized users
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');

//authorized users
var createRouter = require('./routes/create');
var detailsRouter = require('./routes/details');
var attachAccessoriesRouter = require('./routes/attachAccessory');
var editCubeRouter = require('./routes/edit');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials("./views/partials");

app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//unauthorized users
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/', indexRouter);
app.use('/about', aboutRouter);

//authorized users
app.use('/create', createRouter);
app.use('/details', detailsRouter);
app.use('/attach/accessory', attachAccessoriesRouter);
app.use('/edit', editCubeRouter);

//delete user
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
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






