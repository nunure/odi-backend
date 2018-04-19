const mongoose = require('mongoose');

const Home = mongoose.model('Home');

async function find(req, res, next) {
  try {
    return res.json(await Home.find());
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  find,
};
