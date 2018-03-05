const express = require('express');
const winston = require('winston');
const logger = require('morgan');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

winston.cli();
winston.info('Server process starting');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const errorHandler = require('./routes/middleware/error-handler');
const notFound = require('./routes/middleware/not-found');

app.use('/', index);
app.use('/users', users);
app.use(errorHandler());
app.use(notFound());

module.exports = app;
