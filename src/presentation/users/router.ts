import { Router } from 'express';
import { UsersController } from './controller';
import { UsersService } from '../services/users.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { Role } from '../../data';

export class UsersRoutes {
	static get routes(): Router {
		const router = Router();

		const usersService = new UsersService();
		const usersController = new UsersController(usersService);

		router.post('/login', usersController.login);
		router.post('/register', usersController.register);

		router.use(AuthMiddleware.protect);
		router.get(
			'/',
			AuthMiddleware.restrictTo(Role.EMPLOYEE),
			usersController.getAllUsers,
		);
		router.get(
			'/:id',
			AuthMiddleware.restrictTo(Role.EMPLOYEE),
			usersController.getAUser,
		);
		router.patch('/:id', usersController.editUser);
		router.delete('/:id', usersController.disabledUser);

		return router;
	}
}
