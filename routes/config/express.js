const morgan = require('morgan');
const winston = require('winston');
const bodyParser = require('body-parser');
const logger = require('morgan');

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.use(morgan('dev', { stream: { write: message => winston.info(message) } }));
  app.use(bodyParser.json());
  app.use(logger('dev'));
};
