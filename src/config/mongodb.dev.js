const port = 27017;
const host = "127.0.0.1";
const user = "";
const password = "";
const database = "forms";

module.exports = {
  url:
    user && password
      ? `mongodb://${user}:${password}@${host}:${port}/${database}`
      : `mongodb://${host}:${port}/${database}`
};
