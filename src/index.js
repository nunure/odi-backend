import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

import questions from './questions';
import config from './config';
import createLogger from './logger';
import errorHandler from './middleware/error-handler';
import answers from './answers';
import notFound from './middleware/not-found';

const logger = createLogger('boot');
logger.info('server process starting');

const app = express();

let corsOptions = {};

if (process.env.NODE_ENV !== 'production') { // HTTP request logger
  app.use(morgan('dev'));
  // GZIP compression
  app.use(compression());
}
// Enable CORS
corsOptions = {
  origin: process.env.FRONT_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
// Add HTTP Headers security
app.use(helmet());
// Parse HTTP JSON bodies
app.use(bodyParser.json());

// Mount API endpoints
// app.use('/api/images', images);
// app.use('/api/articles', articles);
app.use('/api/questions', questions);
app.use('/api/answers', answers);

// Error handler
app.use(errorHandler());
// Not found handler
app.use(notFound());

logger.info(`connecting to database ${config.mongodb.url}`);
mongoose.connect(
  config.mongodb.url,
  config.mongodb.options,
);
mongoose.connection
  .on('error', (error) => {
    logger.error(`unable to connect to database ${config.mongodb.url}`, error);
    process.exit(10);
  })
  .once('open', () => {
    logger.info(`connection to database ${config.mongodb.url} established`);
    logger.info(`starting http server on http://${config.host}:${config.port}`);
    app.listen(config.port, config.host, (error) => {
      if (error) {
        logger.error(`unable to start http server on http://${config.host}:${config.port}`, error);
        process.exit(10);
      }
      if (process.send) {
        process.send('ready');
      }
      logger.info(`http server started on http://${config.host}:${config.port}`);
    });
  });

function stop() {
  logger.info('stopping server process');
  logger.info('closing database connection');
  mongoose.connection.close((error) => {
    if (error) {
      logger.error('failed to close database connection');
      logger.info('shutting down server');
      return process.exit(1);
    }
    logger.info('database connection closed');
    logger.info('shutting down server');
    return process.exit(0);
  });
}

process.on('SIGINT', stop);
process.on('message', (msg) => {
  if (msg === 'shutdown') {
    stop();
  }
});

export default app;
