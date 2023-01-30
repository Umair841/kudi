export interface CountryInterface {
    externalId?: string;
    countryCode: string;
    countryName: string;
    currencyCode: string;
    population: string;
    capital: string;
    continentName: string;
    isOpen: boolean; // default false
}
