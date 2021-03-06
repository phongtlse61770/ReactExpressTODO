const express = require('express');
const path = require('path');
// var favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const authenticate = require("./security/authenticate");
const index = require('./routes/index');
const users = require('./routes/users');
const todos = require('./routes/todos');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public/app')));

app.use('/', index);
app.use('/login', authenticate);
app.use('/accounts', users);
app.use('/todos', todos);


// app.use('/', function(req, res, next) {
//     res.redirect("/index");
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler for 400
app.use(function (err, req, res, next) {
    if (err.status != 400) {
        next(err);
        return;
    }
    res.status(err.status);
    res.json({
        message: err.message,
        errors: err.errors.mapped()
    });
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;
