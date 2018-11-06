import { Router } from 'express';
import status from 'http-status';

import createLogger from '../logger';
import validateId from '../middleware/validate-id';

import Questions from './questions.model';

const router = new Router();
const logger = createLogger('Questions');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      return res.json(await Questions.find());
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  });

router
  .route('/:id')
  .get(async (req, res, next) => {
    const { questions } = req.params;
    try {
      return res.json(questions);
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  });

router
  .param('id', validateId())
  .param('id', async (req, res, next, id) => {
    try {
      const questions = await Questions.findById(id);
      if (!questions) {
        return next({ status: status.NOT_FOUND, message: `Questions "${id}" not found` });
      }
      req.params.questions = questions;
      return next();
    } catch (error) {
      logger.error(error);
      return next(error);
    }
  });

export default router;
