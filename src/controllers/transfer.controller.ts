import { Request, Response, NextFunction } from 'express';
import TransferService from "../services/transfer.service";

class TransferController {
    public transferService = new TransferService();

    public postTransfer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.transferService.createTransfer(req.body);
            res.status(200).json({ data, message: 'createTransfer' });
        } catch (e) {
            if (e.status) {
                return res.status(e.status).send({status: e.status, code: e.code, message: e.message});
            }
            next(e);
        }
    }

    public getPaginatedTransfersByUserId = async (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        const { perPage, size } = req.query;
        try {
            const data = await this.transferService.getTransfersByUserId(userId, Number(perPage), Number(size));
            res.status(200).json({ data, message: 'getTransfersByUserId' });
        } catch (e) {
            if (e.status) {
                return res.status(e.status).send({status: e.status, code: e.code, message: e.message});
            }
            next(e);
        }
    }
}

export default TransferController;
