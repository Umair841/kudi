import { Request, Response, NextFunction } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '../exceptions/HttpException';

export function validationMiddleware(type: any, skipMissingProperties = false): RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body), { skipMissingProperties })
    .then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new HttpException(400, message, 'E_BAD_REQUEST'));
      } else {
        next();
      }
    });
  };
}

export function validationPathParamsMiddleware(type: any, skipMissingProperties = false): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(plainToClass(type, req.params), { skipMissingProperties })
        .then((errors: ValidationError[]) => {
          if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
            const error = new HttpException(400, message, 'E_BAD_REQUEST');
            next(new HttpException(400, message, 'E_BAD_REQUEST'));
          } else {
            next();
          }
        });
  };
}

export function validationQueryMiddleware(type: any, skipMissingProperties = false): RequestHandler {
  return (req, res, next) => {
    req.query.limit = Number(req.query.limit) as any;
    req.query.offset = Number(req.query.offset) as any;

    validate(plainToClass(type, req.query), { skipMissingProperties })
        .then((errors: ValidationError[]) => {
          if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
            next(new HttpException(400, message));
          } else {
            next();
          }
        });
  };
}
