import * as mongoose from 'mongoose';
import { TokenInterface } from '../interfaces/token.interface';

const tokenSchema = new mongoose.Schema({
    externalId: String,
    userId: String,
    token: String
}, { timestamps: true });

const tokenModel = mongoose.model<TokenInterface & mongoose.Document>('Token', tokenSchema);

export default tokenModel;
