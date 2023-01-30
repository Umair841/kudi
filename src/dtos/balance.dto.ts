import { IsString, IsOptional } from 'class-validator';

export class BalanceDto {
    @IsString()
    @IsOptional()
    externalId: string;

    @IsString()
    userId: string;

    @IsString()
    amount: number;

    @IsString()
    @IsOptional()
    lastOperationDatetime?: number;
}

export class BalanceUserIdPathParam {
    @IsString()
    userId: string;
}
