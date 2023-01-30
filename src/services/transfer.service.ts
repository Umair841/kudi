import * as crypto from 'crypto';
import * as uuid from 'uuid';
import transferModel from "../models/transfer.model";
import {TransferInterface} from '../interfaces/transfer.interface';
import BalanceService from "./balance.service";
import {computeCommission, generateTransferUniqueNumber} from '../utils/util';
import OperationService from "./operation.service";
import CommissionService from "./commission.service";
import UserService from "./users.service";

import {COMMISSION_STATUS, OPERATION_STATUS, OPERATION_TYPE} from "../enum";

export default class TransferService {
    public transfer = transferModel;
    public balanceService = new BalanceService();
    public operationService = new OperationService();
    public commissionService = new CommissionService();
    public userService = new UserService();


    public async createTransfer(transfer: TransferInterface): Promise<TransferInterface | any> {
        const senderBalance = await this.balanceService.getBalanceByUserId(transfer.senderId);
        const receiver = await this.userService.findByPhoneNumber(transfer.phoneNumber);
        const receiverBalance = await this.balanceService.getBalanceByUserId(receiver.externalId);

        if (transfer.amountToReceive > senderBalance.amount) {
            throw {
                status: 400,
                code: 'E_AMOUNT_TO_RECEIVE_INFERIOR_TO_BALANCE',
                message: 'global amount is less than balance'
            };
        }

        const { commission,percentage } = computeCommission(transfer.amountToSend, transfer.amountToReceive);

        const transferUniqueNumber = generateTransferUniqueNumber();

        const transferData = {
            ...transfer,
            externalId: uuid.v4(),
            receiverId: receiver.externalId,
            receiverPhoneNumber: receiver.phoneNumber,
            transferUniqueNumber,
            hash: crypto.createHash('sha256').update(transferUniqueNumber).digest('hex'),
            sendingDatetime: (new Date()).getTime(),
            chargedPercentage: percentage,
        };

        const createdTransfer = await this.transfer.create(transferData);

        const newSenderBalance = senderBalance.amount - transfer.amountToSend;
        const newReceiverBalance = receiverBalance.amount + transfer.amountToReceive;

        await this.balanceService.updateBalanceByUserId(transfer.senderId, {
            amount: newSenderBalance
        });

        await this.balanceService.updateBalanceByUserId(receiver.externalId, {
            amount: newReceiverBalance
        });

        const sendingOperation = await this.operationService.createOperation({
            userId: transfer.senderId,
            amount: transfer.amountToSend,
            type: OPERATION_TYPE.SENDING_TRANSFER,
            status: OPERATION_STATUS.DONE,
            chargedPercentage: percentage
        });

        const receivingOperation = await this.operationService.createOperation({
            userId: receiver.externalId,
            amount: transfer.amountToReceive,
            type: OPERATION_TYPE.RECEIVING_TRANSFER,
            status: OPERATION_STATUS.DONE,
            chargedPercentage: 0
        });

        await this.commissionService.createCommission({
            userId: transfer.senderId,
            operationId: sendingOperation.externalId,
            type: OPERATION_TYPE.SENDING_TRANSFER,
            status: COMMISSION_STATUS.CHARGED,
            percentage,
            amount: commission,
            currency: transferData.senderCurrency
        });

        await this.commissionService.createCommission({
            userId: receiver.externalId,
            operationId: receivingOperation.externalId,
            type: OPERATION_TYPE.RECEIVING_TRANSFER,
            status: COMMISSION_STATUS.NOT_CHARGED,
            percentage: 0,
            amount: 0,
            currency: transferData.senderCurrency
        });

        return {...createdTransfer};
    }

    public async getTransfersByUserId(userId: string, perPage = 20, size = 100): Promise<TransferInterface[]> {
        return this.transfer.find({ senderId: userId }).limit(perPage).skip(perPage * size).sort({ updatedAt: 'asc' });
    }
}
