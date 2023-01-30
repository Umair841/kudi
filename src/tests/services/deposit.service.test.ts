import DepositService from "../../services/deposit.service";
import { DepositInterface } from '../../interfaces/deposit.interface';
import HttpException from "../../exceptions/HttpException";

describe("DepositService", () => {
    const depositService: any =  new DepositService();

    describe('createDeposit',  () => {
        it('should create deposit', async () => {
            depositService.deposit.create = jest.fn().mockReturnValue(Promise.resolve({ _id: 'abc', amount: 1 }));
            depositService.userService.findUserByExternalId = jest.fn().mockReturnValue({ _id: 'a'});
            depositService.balanceService.getBalanceByUserId = jest.fn().mockReturnValue({ _id: 'b', amount: 1 });
            depositService.balanceService.updateBalanceByUserId = jest.fn().mockReturnValue(undefined);
            depositService.computeBalance = jest.fn().mockReturnValue(2);

            await depositService.createDeposit({
                userId: 'abcd-efgh',
                amount: 2000,
                currency: 'EUR'
            });

            expect(depositService.userService.findUserByExternalId).toHaveBeenCalledTimes(1);
            expect(depositService.balanceService.getBalanceByUserId).toHaveBeenCalledTimes(1);
            expect(depositService.balanceService.updateBalanceByUserId).toHaveBeenCalledTimes(1);
            expect(depositService.deposit.create).toHaveBeenCalledTimes(1);
            expect(depositService.computeBalance).toHaveBeenCalledWith(1, 2000);
        });

        it('should throw an exception', async () => {
            depositService.userService.findUserByExternalId = jest.fn().mockReturnValue(undefined);
            try {
                await depositService.createDeposit({
                    userId: 'abcd-efgh',
                    amount: 2000,
                    currency: 'EUR'
                });
            }
            catch (e) {
                expect(e).toBeInstanceOf(HttpException);
            }
        });
    });

    describe('getPaginatedDeposits',  () => {
        const sort = jest.fn().mockReturnValue([{ _id: 'a' }]);
        const skip = jest.fn().mockReturnValue({ sort });
        const limit = jest.fn().mockReturnValue({ skip });

        depositService.deposit.find = jest.fn().mockReturnValue({ limit });

        it('should get paginated deposits', async () => {
           const res = await depositService.getPaginatedDeposits(10, 20);
           expect(res).toEqual([{ _id: 'a' }]);
        });
    });
});
