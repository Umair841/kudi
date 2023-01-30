import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import userModel from "../models/users.model";
import HttpException from '../exceptions/HttpException';
import {DataStoredInToken, RequestWithUser} from '../interfaces/auth.interface';

async function isAuthenticated (req: RequestWithUser, res: Response, next: NextFunction) {
  const authorization = req.headers["authorization"]

  if (!req.headers || !req.headers["authorization"]) {
    return next(new HttpException(401, 'Authorization required', 'E_AUTHORIZATION_REQUIRED'));
  }

  const parts = authorization.split(' ')
  if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
    next(new HttpException(401, 'Invalid Authorization format', 'E_INVALID_AUTHORIZATION_FORMAT'));
  }

  if (!parts[1]) {
    next(new HttpException(401, 'Token required', 'E_TOKEN_REQUIRED'));
  }
  jwt.verify(parts[1], process.env.JWT_SECRET, async (err, decoded: DataStoredInToken) => {
    if (err) {
      return res.status(401).send(new HttpException(401, err.message, err.name));
    }
    const user = await userModel.findOne({ externalId: decoded._id });

    if (user) req.user = user;

    next();
  });
}

export default isAuthenticated;
