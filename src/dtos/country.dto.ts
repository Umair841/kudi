import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CountryDto {
    @IsString()
    @IsOptional()
    externalId: string;

    @IsString()
    countryCode: string;

    @IsString()
    countryName: string;

    @IsString()
    currencyCode: string;

    @IsString()
    population: string;

    @IsString()
    capital: string;

    @IsString()
    continentName: string;

    @IsBoolean()
    isOpen: boolean;
}

export class CountryCurrencyDto {
    @IsString()
    currencyCode: string;
}
