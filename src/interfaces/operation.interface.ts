import { OPERATION_TYPE, OPERATION_STATUS } from '../enum'

export interface OperationInterface {
    externalId?: string;
    userId: string;
    opUniqueNumber?: number;
    description?: string;
    amount: number;
    type: OPERATION_TYPE;
    datetime?: number;
    status: OPERATION_STATUS;
    chargedPercentage: number;
}
