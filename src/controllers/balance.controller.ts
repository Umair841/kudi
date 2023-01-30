import { Request, Response, NextFunction } from 'express';
import { BalanceInterface } from '../interfaces/balance.interface'
import BalanceService from "../services/balance.service";

class BalanceController {
    protected balanceService = new BalanceService();

    public getBalanceByUserId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = req.params;
            const data: BalanceInterface = await this.balanceService.getBalanceByUserId(userId);
            res.status(200).json({ data, message: 'getBalanceByUserId' });
        } catch (e) {
            next(e);
        }
    }
}

export default BalanceController;
