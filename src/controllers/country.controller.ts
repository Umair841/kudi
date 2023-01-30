import { Request, Response, NextFunction } from 'express';
import { CountryInterface } from '../interfaces/country.interface'
import CountryService from "../services/country.service";

export default class CountryController {
    protected countryService = new CountryService();

    public createCountries = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await this.countryService.createCountry(req.body);
            res.status(200).json({ data, message: 'createCountries' });
        } catch (e) {
            next(e);
        }
    }
    public getByCurrency = async (req: Request, res: Response, next: NextFunction) => {
        const { currencyCode } = req.params;
        try {
            const data = await this.countryService.getCountryByCurrency(currencyCode);
            res.status(200).json({ data, message: 'getCountryByCurrency' });
        } catch (e) {
            next(e);
        }
    }

    public getByCountry = async (req: Request, res: Response, next: NextFunction) => {
        const { countryCode } = req.params;
        try {
            const data = await this.countryService.getByCountryCode(countryCode);
            res.status(200).json({ data, message: 'getByCountryCode' });
        } catch (e) {
            next(e);
        }
    }

    public openCountry = async (req: Request, res: Response, next: NextFunction) => {
        const {countryCode} = req.params;
        try {
            const data = await this.countryService.openCountry(countryCode);
            res.status(200).json({data, message: 'openCountry'});
        } catch (e) {
            next(e);
        }
    }
}
