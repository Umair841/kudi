import * as mongoose from 'mongoose';
import { CountryInterface } from '../interfaces/country.interface';

const countrySchema = new mongoose.Schema({
    externalId: {type: String, required: true, unique: true, index: true},
    countryCode: String,
    countryName: String,
    currencyCode: String,
    population: String,
    capital: String,
    continentName: String,
    isOpen: { type: Boolean, default: false }
}, { timestamps: true });
const countryModel = mongoose.model<CountryInterface & mongoose.Document>('Country', countrySchema);

export default countryModel;
