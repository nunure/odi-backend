import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV; // 'development' or 'production'

// Production configuration with user password
const production = {
  host: process.env.HOST,
  port: process.env.PORT,
  mongodb: {
    url: `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`,
    options: {
      useNewUrlParser: true,
      auth: {
        user: process.env.MONGODB_USER,
        password: process.env.MONGODB_PASSWORD,
      },
    },
  },
};

// Dev configuration, user and password can't be empty
const development = {
  host: process.env.HOST,
  port: process.env.PORT,
  mongodb: {
    url: `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`,
    options: {
      useNewUrlParser: true,
    },
  },
};

const config = {
  development,
  production,
};

module.exports = config[env];
