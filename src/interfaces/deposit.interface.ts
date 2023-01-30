import { OPERATION_STATUS } from '../enum';
export interface DepositInterface {
  externalId?: string;
  userId: string;
  amount: number;
  currency: string;
  depositDateTime?: number;
  chargedPercentage?: number; // default 0 - opération gratuite
  status?: OPERATION_STATUS;
}
