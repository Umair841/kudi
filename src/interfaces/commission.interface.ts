import { OPERATION_TYPE, COMMISSION_STATUS } from '../enum';

export interface CommissionInterface {
    externalId?: string;
    userId: string;
    operationId?: string;
    type: OPERATION_TYPE;
    status: COMMISSION_STATUS;
    percentage: number;
    amount: number;
    currency: string;
}
