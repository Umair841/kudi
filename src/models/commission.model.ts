import * as mongoose from 'mongoose';
import { CommissionInterface } from '../interfaces/commission.interface';

const commissionSchema = new mongoose.Schema({
    externalId: {type: String, required: true, unique: true, index: true},
    userId: String,
    operationId: String,
    type: {
        type: String,
        enum: ['DEPOSIT', 'WITHDRAW', 'SENDING_TRANSFER', 'RECEIVING_TRANSFER']
    },
    status: {
        type: String,
        enum: ['FREE', 'CHARGED', 'NOT_CHARGED']
    },
    percentage: Number,
    amount: Number,
    currency: String,
}, { timestamps: true });

const commissionModel = mongoose.model<CommissionInterface & mongoose.Document>('Commission', commissionSchema);

export default commissionModel;
