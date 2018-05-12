const mongoose = require("mongoose");

module.exports = () => (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next({ status: 400, message: `Invalid id "${id}"` });
  }
  return next();
};
