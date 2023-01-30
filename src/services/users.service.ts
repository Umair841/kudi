import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as uuid from 'uuid';
import * as _ from 'lodash';
import HttpException from '../exceptions/HttpException';
import { User, UsersInterface } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import tokenModel from '../models/token.model';
import { isEmptyObject } from '../utils/util';
// import sendMail from '../utils/sendgrid';
// import * as jwt from 'jsonwebtoken';
import BalanceService from './balance.service';
import {USER_ROLE} from "../enum";
class UserService {
  public users = userModel;
  public balanceService = new BalanceService();

  public async findAllUser(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async findUserById(userId: string): Promise<User> {
    const findUser: User = await this.users.findById(userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async findByPhoneNumber(phoneNumber: string): Promise<User> {
    const findUser: User = await this.users.findOne({ phoneNumber });
    if (!findUser) throw new HttpException(404, "You're not user");

    return findUser;
  }

  public async findUserByExternalId(externalId: string): Promise<User> {
    const findUser: User = await this.users.findOne({ externalId });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: UsersInterface): Promise<User> {
    if (isEmptyObject(userData)) {

      throw new HttpException(400, "You're not userData");

    }

    const findUser = await this.users.findOne({ phoneNumber: userData.phoneNumber });
    if (findUser) throw new HttpException(409, `You're phone number ${userData.phoneNumber} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    if (_.isEmpty(userData.roles)) {
      userData.roles.push(USER_ROLE.USER);
    }

    const createUserData: any = await this.users.create({
      ...userData,
      externalId: uuid.v4(),
      password: hashedPassword,
    });

    const balance = await this.balanceService.createBalance({
      userId: createUserData.externalId,
      amount: 0,
    });

    delete createUserData.password;
    return {
      ...createUserData,
      balance,
    };
  }

  public async updateUser(userId: string, userData: User): Promise<User> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const updated: User = await this.users.findOneAndUpdate({externalId: userId}, { ...userData });
    if (!updated) throw new HttpException(404, "You're not user");

    return updated;
  }

  public async deleteUserData(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }

  public async forgotPassword(phoneNumber: string) {
    const user = await this.users.findOne({ phoneNumber });
    if (!user) {
      throw new HttpException(404, "You're not user");
    }

    const token = tokenModel.findOne({ userId: user.externalId });
    if (token) await token.deleteOne();

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hash = await bcrypt.hash(resetToken, 10);

    await tokenModel.create({
      userId: user.externalId,
      token: hash
    });

    const link = `/password-reset?token=${resetToken}&userId=${user.externalId}`

    // TODO Send an SMS to the number with a link of page that let user to reset the password
  }
}

export default UserService;
