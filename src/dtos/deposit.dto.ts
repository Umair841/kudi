import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { OPERATION_STATUS } from '../enum';

export class DepositDto {
  @IsString()
  @IsOptional()
  externalId: string;

  @IsString()
  @IsOptional()
  userId: string;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsNumber()
  @IsOptional()
  depositDateTime: number;

  @IsNumber()
  @IsOptional()
  chargedPercentage: number;

  @IsEnum(OPERATION_STATUS)
  @IsOptional()
  status: OPERATION_STATUS;
}
