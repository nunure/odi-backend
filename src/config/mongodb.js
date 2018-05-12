const port = process.env.MONGODB_PORT || 27017;
const host = process.env.MONGODB_HOST || "127.0.0.1";
const user = process.env.MONGODB_USER || "";
const password = process.env.MONGODB_PASSWORD || "";
const database = process.env.NODE_ENV || "odi";

module.exports = {
  url:
    user && password
      ? `mongodb://${user}:${password}@${host}:${port}/${database}`
      : `mongodb://${host}:${port}/${database}`
};
