import { Router } from 'express';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { TransferDto } from '../dtos/transfer.dto';
import TransferController from "../controllers/transfer.controller";
import isAuthenticated from '../middlewares/isAutenticated';

class TransferRoute {
    public path = '/transfer';
    public router = Router();
    public controller = new TransferController();

    constructor() {
        this.router.post(`${this.path}/create`, [isAuthenticated, validationMiddleware(TransferDto)], this.controller.postTransfer);
        this.router.get(`${this.path}/:userId/list`, isAuthenticated, this.controller.getPaginatedTransfersByUserId);
    }
}

export default TransferRoute;
