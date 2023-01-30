import * as mongoose from 'mongoose';
import { OperationInterface } from '../interfaces/operation.interface';


const operationSchema = new mongoose.Schema({
    externalId: {type: String, required: true, unique: true, index: true},
    userId: String,
    opUniqueNumber: {type: Number, index: true},
    description: String,
    amount: {type: Number, index: true},
    type: {
        type: String,
        index: true,
        enum: ['DEPOSIT', 'WITHDRAW', 'SENDING_TRANSFER', 'RECEIVING_TRANSFER'],
    },
    datetime: {type: Number, index: true},
    status: {
        type: String,
        enum: ['STARTED', 'DONE', 'NOT_DONE'],
        default: 'STARTED',
        index: true
    },
    chargedPercentage: {type: Number, index: true}
}, { timestamps: true });

const operationModel = mongoose.model<OperationInterface & mongoose.Document>('Operation', operationSchema);

export default operationModel;
