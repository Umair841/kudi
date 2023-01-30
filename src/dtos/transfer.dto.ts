import { IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { TRANSFER_STATUS } from '../enum';

export class TransferDto {
    @IsString()
    senderId: string;

    @IsString()
    @IsOptional()
    receiverId: string;

    @IsString()
    phoneNumber: string;

    @IsString()
    @IsOptional()
    operatorId: string;

    @IsNumber()
    amountToSend: number;

    @IsNumber()
    amountToReceive: number;

    @IsString()
    senderCurrency: string;

    @IsString()
    @IsOptional()
    receiverCurrency: string;

    @IsString()
    @IsOptional()
    sendingCountry: string;

    @IsString()
    @IsOptional()
    receivingCountry: string;

    @IsEnum(TRANSFER_STATUS)
    status: TRANSFER_STATUS;
}
