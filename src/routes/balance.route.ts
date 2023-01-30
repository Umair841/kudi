import { Router } from 'express';
import { BalanceUserIdPathParam } from '../dtos/balance.dto';
import BalanceController from "../controllers/balance.controller";


import { validationPathParamsMiddleware } from '../middlewares/validation.middleware';

class BalanceRoute {
    public path = '/balance';
    public router = Router();
    public controller = new BalanceController();

    constructor() {
        this.router.get(`${this.path}/:userId`, validationPathParamsMiddleware(BalanceUserIdPathParam), this.controller.getBalanceByUserId);
    }
}

export default BalanceRoute;
