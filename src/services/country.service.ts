import * as uuid from 'uuid';
import * as _ from 'lodash';
import { CountryInterface } from '../interfaces/country.interface';
import HttpException from '../exceptions/HttpException';
import countryModel from "../models/country.model";

export default class CountryService {
    public country = countryModel;

    createCountry (country: CountryInterface | CountryInterface[]): Promise<CountryInterface | CountryInterface[]> {
        if (Array.isArray(country)) {
            country = _.chain(country).map(singleCountry => ({ ...singleCountry, externalId: uuid.v4() })).value();
            return this.country.create(country)
        }
        country.externalId = uuid.v4();
        return this.country.create(country)
    }

    getOpenCountriesByCriteria (criteria: object) {
        return this.country.find(criteria);
    }

    async getCountryByCurrency (currencyCode: string) {
        const countryInfo =  await this.country.find({ currencyCode });
        if (!countryInfo) {
            throw new HttpException(404, "country not found");
        }
        return countryInfo;
    }

    async getByCountryCode (countryCode: string): Promise<CountryInterface> {
        const countryInfo =  await this.country.findOne({ countryCode });
        if (!countryInfo) {
            throw new HttpException(404, "country not found");
        }
        return countryInfo;
    }

    async openCountry(countryCode: string) {
        const countryInfo = await this.getByCountryCode(countryCode);
        await this.country.updateOne({ externalId: countryInfo.externalId }, { isOpen: true });
        return true;
    }
}
