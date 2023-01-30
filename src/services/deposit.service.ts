import * as uuid from 'uuid';
import * as _ from 'lodash';
import depositModel from '../models/deposit.model';
import { DepositInterface } from '../interfaces/deposit.interface';
import { OPERATION_STATUS } from '../enum';
import UserService from './users.service';
import BalanceService from './balance.service';
import HttpException from '../exceptions/HttpException';

export default class DepositService {
  public deposit = depositModel;
  public userService = new UserService();
  public balanceService = new BalanceService();

  public computeBalance(balanceAmount: number, depositAmount: number) {
    return String(_.sum([balanceAmount, depositAmount]))
  }

  public async createDeposit(deposit: DepositInterface): Promise<DepositInterface> {
    const user = await this.userService.findUserByExternalId(deposit.userId);

    if (!user) throw new HttpException(404, `user with id${deposit.externalId} not found`);

    deposit = {
      ...deposit,
      externalId: uuid.v4(),
      depositDateTime: (new Date()).getTime(),
      chargedPercentage: 0,
      status: OPERATION_STATUS.STARTED,
    };

    const deposited = await this.deposit.create(deposit);
    const balance = await this.balanceService.getBalanceByUserId(deposit.userId);

    await this.balanceService.updateBalanceByUserId(deposit.userId, {
      amount: this.computeBalance(parseFloat(balance.amount.toFixed(2)), parseFloat(deposit.amount.toFixed(2)))
    });
    return deposited;
  }

  public async getPaginatedDeposits(perPage = 20, size = 100): Promise<DepositInterface[]> {
    return this.deposit.find().limit(perPage).skip(perPage * size).sort({ updatedAt: 'asc' });
  }

  public async getPaginatedDepositsByUserId(userId: string, perPage = 20, size = 100): Promise<DepositInterface[]> {
    return this.deposit.find({ userId }).limit(perPage).skip(perPage * size).sort({ updatedAt: 'asc' });
  }
}
