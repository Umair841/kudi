import { Request, Response, NextFunction } from 'express';
import validDomains from '../configurations/app/authorized';

export default function (req: Request, res: Response, next: NextFunction) {

  if (validDomains.indexOf(req.headers.origin as string) > -1) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
}
