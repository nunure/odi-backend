require('./answers');
const { Router } = require('express');

const validateId = require('../middleware/validate-id');
const controller = require('./answers-controller');

const router = new Router();

router.route('/')
  .get(controller.find);

router.route('/create')
  .get(controller.create);

router.route('/:id')
  .get(controller.findById);

router.param('id', validateId())
  .param('id', controller.load);

module.exports = {
  router,
};
