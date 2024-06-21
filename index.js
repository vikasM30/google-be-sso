const helmet = require('helmet') // help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
const express = require('express')
const app = express()
const session = require("express-session")
const csrf = require('csurf')
const userRoutes = require('./routes/userRouter')
const authRoutes = require('./routes/authRouter')
const passport = require('passport')
const createError = require('http-errors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
require("dotenv").config();

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60000 }
}))

app.set('view engine', 'ejs')

app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('public'))
app.use(helmet())
app.use(csrf());
app.use(passport.authenticate('session'));
app.use(cookieParser());

app.use(function(req, res, next) {
    var msgs = req.session.messages || [];
    res.locals.messages = msgs;
    res.locals.hasMessages = !! msgs.length;
    req.session.messages = [];
    next();
  });

app.use(function(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
  });

app.use('/api', userRoutes)
app.use('/', authRoutes)

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

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`listening to port ${port}...`)
})