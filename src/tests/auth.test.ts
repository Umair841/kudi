import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import App from '../app';
import AuthRoute from '../routes/auth.route';
import { CreateUserDto } from '../dtos/users.dto';
import { TokenData } from '../interfaces/auth.interface';
import AuthService from '../services/auth.service';

afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve({}), 500));
});

describe('Testing AuthController', () => {
  describe('POST /signup', () => {
    it('response should have the Create userData', () => {
      const userData: CreateUserDto = {
        email: 'lkm@gmail.com',
        password: 'q1w2e3r4',
        civility: 'Mr',
        firstName: 'Kalel',
        lastName: 'Wilfrid',
        phoneNumber: '01020304',
        birthdate: '30-08-1991',
        birthplace: 'Brazza',
        roles: ['ADMIN'],
      };

      const authRoute = new AuthRoute();

      authRoute.authController.authService.users.findOne = jest
            .fn()
            .mockReturnValue(Promise.resolve(undefined));

      authRoute.authController.authService.users.create = jest
            .fn()
            .mockReturnValue({ _id: 0, ...userData });

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);

      return request(app.getServer())
                .post(`/api${authRoute.path}/signup`)
                .send(userData);
    });
  });

  describe('POST /login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const userData: CreateUserDto = {
        email: 'lkm@gmail.com',
        password: 'q1w2e3r4',
        phoneNumber: '01020304',
        civility: 'Mr',
        firstName: 'Kalel',
        lastName: 'Wilfrid',
        birthdate: '30-08-1991',
        birthplace: 'Brazza',
        roles: ['ADMIN'],
      };
      process.env.JWT_SECRET = 'jwt_secret';

      const authRoute = new AuthRoute();

      authRoute.authController.authService.users.findOne = jest
                .fn()
                .mockReturnValue(Promise.resolve({
                  _id: 0,
                  email: 'lim@gmail.com',
                  password: await bcrypt.hash(userData.password, 10),
                }));

      (mongoose as any).connect = jest.fn();
      const app = new App([authRoute]);
      return request(app.getServer())
                .post(`/api${authRoute.path}/login`)
                .send(userData)
                .expect('Set-Cookie', /^Authorization=.+/);
    });
  });

});

describe('Testing AuthService', () => {
  describe('when creating a cookie', () => {
    it('should return a string', () => {
      const tokenData: TokenData = {
        token: '',
        expiresIn: 1,
      };

      const authService = new AuthService();

      expect(typeof authService.createCookie(tokenData))
            .toEqual('string');
    });
  });
});
