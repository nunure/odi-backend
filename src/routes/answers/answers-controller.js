const mongoose = require("mongoose");

const odiCompute = require("../../functions/odi-compute");
const winston = require("@config/winston");
const Answers = mongoose.model("Answers");

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

async function createEmpty(req, res, next) {
  try {
    return res.json(new Answers());
  } catch (error) {
    return next(error);
  }
}

async function create(req, res, next) {
  const answer = new Answers(req.body);
  console.log(req.body);
  console.log(answer);
  try {
    await answer.validateSync();
  } catch (error) {
    winston.error("status 422 :" + error.message);
    return next({ status: 422, message: error.message });
  }
  try {
    await odiCompute.genDoc(answer);
  } catch (error) {
    winston.error("status 424 :" + error.message);
    return next({ status: 424, message: error.message });
  }
  /* Implement later when we will want to save data un db
  try {
    await answer.save();
  } catch (error) {
    return next(error);
  } */
  return res.sendStatus(204);
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
  createEmpty,
  create
};
