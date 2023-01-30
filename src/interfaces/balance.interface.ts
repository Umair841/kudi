export interface BalanceInterface {
  externalId?: string;
  userId: string;
  amount: number;
  currency?: string;
  lastOperationDatetime?: number;
}
