import * as mongoose from 'mongoose';
import { DepositInterface } from '../interfaces/deposit.interface';

const depositSchema = new mongoose.Schema({
  externalId: {type: String, required: true, unique: true, index: true},
  userId: String,
  amount: Number,
  currency: String,
  depositDateTime: Number,
  chargedPercentage: Number,
  status: {
    type: String,
    enum: ['STARTED', 'DONE', 'NOT_DONE'],
    default: 'STARTED',
  },
}, { timestamps: true });

const depositModel = mongoose.model<DepositInterface & mongoose.Document>('Deposit', depositSchema);

export default depositModel;
