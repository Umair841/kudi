import * as uuid from 'uuid';
import commissionModel from "../models/commission.model";
import { CommissionInterface } from '../interfaces/commission.interface';

export default class CommissionService {
    public commission = commissionModel;

    public async createCommission(commission: CommissionInterface): Promise<CommissionInterface> {
        const commissionData = {
          ...commission,
          externalId: uuid.v4(),
          operationId: "SYSTEM",
        };
        return this.commission.create(commissionData);
    }
}
