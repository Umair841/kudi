import { Router } from 'express';
import { CountryDto } from '../dtos/country.dto';
import CountryController from "../controllers/country.controller";


import { validationMiddleware } from '../middlewares/validation.middleware';

class BalanceRoute {
    public path = '/country';
    public router = Router();
    public controller = new CountryController();

    constructor() {
        this.router.post(`${this.path}/create`, validationMiddleware(CountryDto || [CountryDto]), this.controller.createCountries);
        this.router.get(`${this.path}/currency/:currencyCode/`, this.controller.getByCurrency);
        this.router.get(`${this.path}/code/:countryCode`, this.controller.getByCountry);
        this.router.put(`${this.path}/:countryCode/open`, this.controller.openCountry);
    }
}

export default BalanceRoute;
