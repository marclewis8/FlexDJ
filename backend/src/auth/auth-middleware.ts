import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

import { getSessionBySessionId } from '../auth/user-auth';
import { assertUser } from '../auth/assert-user';

export default class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    const { sessionId } = req.cookies;
    if (!sessionId) {
      return next();
    }

    try {
      const session = await getSessionBySessionId(sessionId);
      req['user'] = await assertUser(session.userId);
    } catch (e) {
      console.log('session fetching failed', e);
    }
    next();
  }
}
