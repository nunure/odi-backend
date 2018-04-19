const mongoose = require('mongoose');

const Questions = mongoose.model('Questions');

async function load(req, res, next, id) {
  try {
    const questions = await Questions.findById(id);
    if (!questions) {
      return next({ status: 404, message: `Questions "${id}" not found` });
    }
    req.params.questions = questions;
    return next();
  } catch (error) {
    return next(error);
  }
}

async function find(req, res, next) {
  try {
    return res.json(await Questions.find());
  } catch (error) {
    return next(error);
  }
}

async function findById(req, res, next) {
  const { questions } = req.params;
  try {
    return res.json(questions);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  find,
  findById,
  load,
};
