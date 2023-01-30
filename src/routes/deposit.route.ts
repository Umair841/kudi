import { Router } from 'express';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { DepositDto } from '../dtos/deposit.dto';
import DepositController from '../controllers/deposit.controller';

class DepositRoute {
  public path = '/deposit';
  public router = Router();
  public controller = new DepositController();

  constructor() {
    this.router.post(`${this.path}/create`, validationMiddleware(DepositDto), this.controller.postDeposit);
    this.router.get(`${this.path}/list`, this.controller.getDeposits);
    this.router.get(`${this.path}/:userId/list`, this.controller.getDepositsByUserId);
  }
}

export default DepositRoute;
