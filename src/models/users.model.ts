import * as mongoose from 'mongoose';
import { User } from '../interfaces/users.interface';

const userSchema = new mongoose.Schema({
  externalId: {
    type: String,
    unique: true,
    index: true
  },
  civility: String,
  firstName: String,
  lastName: String,
  birthdate: String,
  birthplace: String,
  registeringCountry: String,
  countryCode: String,
  email: String,
  password: String,
  status: String,
  phoneNumber: {
    type: String,
    unique: true,
    maxLength: 15,
    required: true,
    index: true
  },
  roles: [String],
}, { timestamps: true });

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
