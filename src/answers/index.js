import { Router } from 'express';
import status from 'http-status';

import createLogger from '../logger';
import validateId from '../middleware/validate-id';
import odiCompute from './odi-compute';

import Answers from './answers.model';

const router = new Router();
const logger = createLogger('Questions');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      return res.json(await Answers.find());
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  })
  .put(async (req, res, next) => {
    const answer = new Answers(req.body);
    // logger.log(req.body);
    // logger.log(answer);
    try {
      await answer.validateSync();
      await odiCompute.genDoc(answer);
    } catch (error) {
      logger.error(error);
      return next({
        status: status.UNPROCESSABLE_ENTITY,
        message: error.message,
        errors: error.errors,
      });
    }
    /* Implement later when we will want to save data in db
    try {
      await answer.save();
    } catch (error) {
      return next(error);
    } */
    return res.sendStatus(status.CREATED);
  });

router
  .route('/createEmpty')
  .get(async (req, res, next) => {
    try {
      return res.json(new Answers());
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    const { answers } = req.params;
    try {
      return res.json(answers);
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  });

router
  .param('id', validateId())
  .param('id', async (req, res, next, id) => {
    try {
      const answers = await Answers.findById(id);
      if (!answers) {
        return next({ status: status.NOT_FOUND, message: `Answers "${id}" not found` });
      }
      req.params.answers = answers;
      return next();
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  });


export default router;
