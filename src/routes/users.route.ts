import { Router } from 'express';
import UsersController from '../controllers/users.controller';
import { CreateUserDto, UpdateUserDto, ForgotPasswordDto } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import { validationMiddleware } from '../middlewares/validation.middleware';
import isAuthenticated from '../middlewares/isAutenticated';

class UsersRoute implements Route {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    this.router.post(`${this.path}`, validationMiddleware(CreateUserDto), this.usersController.createUser);
    this.router.put(`${this.path}/:id`, validationMiddleware(UpdateUserDto,  true), isAuthenticated, this.usersController.updateUser);
    this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);

    this.router.post(`${this.path}/password/forgot`, validationMiddleware(ForgotPasswordDto), this.usersController.postForgotPassword);
  }
}

export default UsersRoute;
