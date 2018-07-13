if (process.env.NODE_ENV === "production") {
  module.exports = require("./mongodb.prod");
} else {
  module.exports = require("./mongodb.dev");
}
