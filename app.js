const express = require('express');
const winston = require('winston');

const configExpress = require('./routes/config/express');
const index = require('./routes/index');
const users = require('./routes/users');

winston.cli();
winston.info('Server process starting');

const app = express();

const errorHandler = require('./routes/middleware/error-handler');
const notFound = require('./routes/middleware/not-found');

// Pourquoi on ne met pas tous dans la config ?
configExpress(app);
app.use('/', index);
app.use('/users', users);
app.use(errorHandler());
app.use(notFound());

module.exports = app;
