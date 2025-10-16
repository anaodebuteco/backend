var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

<<<<<<< HEAD
=======
const tarefaRouter = require("./routes/tarefaRouter");
app.use("/tarefas", tarefaRouter);


>>>>>>> db07edac9fbfbffd87c6e78c467494d5ff0f2634
module.exports = app;
