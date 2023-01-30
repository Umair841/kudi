import { NextFunction, Response } from 'express';
import * as _ from 'lodash';
import {RequestWithUser} from '../interfaces/auth.interface';
import HttpException from "../exceptions/HttpException";

export function isAdmin(req: RequestWithUser, res: Response, next: NextFunction) {
    const user = req.user;

    if (!_.includes(user.roles, 'ADMIN')) {
        next(new HttpException(401, 'Your are not an admin user', 'E_NOT_ADMIN'));
    }
    next();
}
