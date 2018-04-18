const mongoose = require('mongoose');

const Answers = mongoose.model('Answers');

async function load(req, res, next, id) {
  try {
    const answers = await Answers.findById(id);
    if (!answers) {
      return next({ status: 404, message: `Answers "${id}" not found` });
    }
    req.params.answers = answers;
    return next();
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    return res.json(new Answers());
  } catch (error) {
    return next(error);
  }
}

async function find(req, res, next) {
  try {
    return res.json(await Answers.find());
  } catch (error) {
    return next(error);
  }
}

async function findById(req, res, next) {
  const { answers } = req.params;
  try {
    return res.json(answers);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  find,
  findById,
  load,
  create,
};
