import * as uuid from 'uuid';
import balanceModel from '../models/balance.model';
import { BalanceInterface } from '../interfaces/balance.interface';

class BalanceService {
  public balance = balanceModel;

  public async createBalance(balanceData: BalanceInterface): Promise<BalanceInterface> {
    balanceData.externalId = uuid.v4();
    balanceData.lastOperationDatetime = (new Date()).getTime();
    return this.balance.create(balanceData);
  }

  public async getBalanceByUserId(userId: string): Promise<BalanceInterface> {
    return this.balance.findOne({ userId });
  }

  public async updateBalance(externalId: string, criteria: any) {
    await this.balance.findOneAndUpdate({ externalId }, criteria);
  }

  public async updateBalanceByUserId(userId: string, criteria: any) {
    criteria.lastOperationDatetime = (new Date()).getTime();
    await this.balance.findOneAndUpdate({ userId }, criteria);
  }
}

export default BalanceService;
