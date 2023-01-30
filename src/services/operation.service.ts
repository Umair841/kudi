import * as uuid from 'uuid';
import operationModel from "../models/operation.model";
import { OperationInterface } from '../interfaces/operation.interface';
import { generateNumber } from '../utils/util';

export default class OperationService {
    public operation = operationModel;

    public async createOperation(operation: OperationInterface): Promise<OperationInterface> {
        const operationData = {
            ...operation,
            externalId: uuid.v4(),
            opUniqueNumber: generateNumber(),
            datetime: (new Date()).getTime(),
        };
        return this.operation.create(operationData);
    }

    public async getPaginatedOperations(perPage = 20, size = 100): Promise<OperationInterface[]> {
        return this.operation.find().skip(perPage * size).sort({ updatedAt: 'asc' });
    }

    public async getOperationsByUserId(userId: string, perPage = 20, size = 100): Promise<OperationInterface[]> {
        return this.operation.find({ userId }).skip(perPage * size).sort({ updatedAt: 'asc' });
    }

    public async getOperationById(userId: string, externalId: string): Promise<OperationInterface> {
        return this.operation.findOne({ externalId });
    }
}
