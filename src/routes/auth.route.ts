import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { CreateUserDto } from '../dtos/users.dto';
import { AuthDto } from '../dtos/auth.dto';
import Route from '../interfaces/routes.interface';
import isAutenticated from '../middlewares/isAutenticated';
import { validationMiddleware } from '../middlewares/validation.middleware';

class AuthRoute implements Route {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, validationMiddleware(CreateUserDto), this.authController.signUp);
    this.router.post(`${this.path}/login`, validationMiddleware(AuthDto), this.authController.logIn);
    this.router.post(`${this.path}/logout`, isAutenticated, this.authController.logOut);
  }
}

export default AuthRoute;
