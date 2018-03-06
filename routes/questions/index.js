require('./questions');
const { Router } = require('express');

const controller = require('./questions-controller');

const router = new Router();

router.route('/')
  .get(controller.find);

module.exports = {
  router,
};
