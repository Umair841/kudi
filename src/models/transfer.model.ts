import * as mongoose from 'mongoose';
import { TransferInterface } from '../interfaces/transfer.interface';


const transferSchema = new mongoose.Schema({
    externalId: {type: String, required: true, unique: true, index: true},
    senderId: String,
    receiverId: String,
    operatorId: String,
    receiverPhoneNumber: String,
    transferUniqueNumber: String,
    description: String,
    amountToSend: Number,
    amountToReceive: Number,
    senderCurrency: String,
    receiverCurrency: String,
    sendingCountry: String,
    receivingCountry: String,
    chargedPercentage: Number,
    status: {
        type: String,
        enum: ['STARTED', 'ONGOING', 'SENT', 'WITHDRAWN'],
        default: 'STARTED'
    },
    sendingDatetime: Number,
    hash: String,
}, { timestamps: true });

const transferModel = mongoose.model<TransferInterface & mongoose.Document>('Transfer', transferSchema);

export default transferModel;
