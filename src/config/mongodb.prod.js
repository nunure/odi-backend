const port = process.env.MONGODB_PORT;
const host = process.env.MONGODB_HOST;
const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const database = process.env.MONGODB_DATABASE;

module.exports = {
  url:
    user && password
      ? `mongodb://${user}:${password}@${host}:${port}/${database}`
      : `mongodb://${host}:${port}/${database}`
};
