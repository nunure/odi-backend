require('./home');
const { Router } = require('express');

const controller = require('./home-controller');

const router = new Router();

/* GET ALL HOMES */
router.route('/')
  .get(controller.find);

module.exports = {
  router,
};
