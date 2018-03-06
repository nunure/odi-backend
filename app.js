const express = require('express');
const winston = require('winston');

const configExpress = require('./routes/config/express');

winston.cli();
winston.info('Server process starting');

const app = express();

const home = require('./routes/home/');
const questions = require('./routes/questions/');
const errorHandler = require('./routes/middleware/error-handler');
const notFound = require('./routes/middleware/not-found');

// Déclaration des routes
configExpress(app);
app.use('/home', home.router);
app.use('/questions', questions.router);
app.use(errorHandler());
app.use(notFound());

module.exports = app;
