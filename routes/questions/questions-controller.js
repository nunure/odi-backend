const mongoose = require('mongoose');

const Questions = mongoose.model('Questions');

async function find(req, res, next) {
  try {
    return res.json(await Questions.find());
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  find,
};
