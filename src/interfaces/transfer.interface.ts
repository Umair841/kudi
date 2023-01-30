import { TRANSFER_STATUS } from '../enum';

export interface TransferInterface {
    externalId?: string;
    senderId: string;
    phoneNumber?: string;
    receiverId?: string;
    operatorId: string;
    receiverPhoneNumber?: string;
    amountToSend: number;
    amountToReceive: number;
    senderCurrency: string;
    receiverCurrency: string;
    sendingCountry?: string;
    receivingCountry?: string;
    chargedPercentage?: number;
    status: TRANSFER_STATUS;
    sendingDatetime?: number;
    hash?: string;
    transferUniqueNumber?: string;
}
