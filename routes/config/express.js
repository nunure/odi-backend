const morgan = require('morgan');
const winston = require('winston');
const bodyParser = require('body-parser');
const logger = require('morgan');

module.exports = (app) => {
  app.use(morgan('dev', { stream: { write: message => winston.info(message) } }));
  app.use(bodyParser.json());
  app.use(logger('dev'));
};
