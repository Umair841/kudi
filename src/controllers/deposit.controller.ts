import { Request, Response, NextFunction } from 'express';
import DepositService from '../services/deposit.service';

class DepositController {
  public depositService = new DepositService();

  public postDeposit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.depositService.createDeposit(req.body);
      res.status(200).json({ data, message: 'createDeposit' });
    } catch (e) {
      if (e.status) {
        return res.status(e.status).send({status: e.status, code: e.code, message: e.message});
      }
      next(e);
    }
  }

  public getDeposits = async (req: Request) => {
    const { perPage, size } = req.query;
    return this.depositService.getPaginatedDeposits(Number(perPage), Number(size));
  }

  public getDepositsByUserId = async (req: Request, res: Response, next: NextFunction) => {
    const { perPage, size } = req.query;
    const { userId } = req.params;
    try {
      const data = await this.depositService.getPaginatedDepositsByUserId(userId, Number(perPage), Number(size));
      res.status(200).json({ data, message: 'getDeposits' });
    } catch (e) {
      if (e.status) {
        return res.status(e.status).send({status: e.status, code: e.code, message: e.message});
      }
      next(e);
    }
  }
}

export default DepositController;
