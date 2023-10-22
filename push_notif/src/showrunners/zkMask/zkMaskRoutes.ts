import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import middlewares from '../../api/middlewares';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import DappHackChannel from './DappHackChannel';

const route = Router();

export default (app: Router) => {
  app.use('/showrunners/DappHack', route);

  route.post(
    '/notifyAuthRequest',
    celebrate({
      body: Joi.object({
        simulate: Joi.object(),
      }),
    }),
    middlewares.onlyLocalhost,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger');
      logger.debug('Calling /showrunners/DappHack/notifyAuthRequest: %o', req.body);
      try {
        const DappHackChannel = Container.get(DappHackChannel);
        const response = await DappHackChannel.notifyAuthRequest(req.body.simulate);

        return res.status(201).json(response);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
