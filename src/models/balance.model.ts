import * as mongoose from 'mongoose';
import { BalanceInterface } from '../interfaces/balance.interface';

const balanceSchema = new mongoose.Schema({
  externalId: {type: String, required: true, unique: true, index: true},
  userId: String,
  amount: Number,
  lastOperationDatetime: Number,
}, { timestamps: true });
const balanceModel = mongoose.model<BalanceInterface & mongoose.Document>('Balance', balanceSchema);

export default balanceModel;
