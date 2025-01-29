import { Request, Response } from 'express';
import { UsersService } from '../services/users.service';
import { CreateUserDTO, CustomError, EditUserDTO } from '../../domain';
import { LoginUserDTO } from '../../domain/dtos/users/login.user.dto';
import { RegisterDTO } from '../../domain/dtos/users/register.user.dto';
import { protectAccountOwner } from '../../config/validate-owner';

export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({
				message: error.message,
			});
		}
		console.log(error);
		return res.status(500).json({
			message: 'Something went wrong...',
		});
	};

	getAllUsers = (req: Request, res: Response) => {
		this.usersService
			.getAllUsers()
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	getAUser = (req: Request, res: Response) => {
		const { id } = req.params;

		this.usersService
			.getAUser(id)
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	createAUser = (req: Request, res: Response) => {
		const [error, createUserDto] = CreateUserDTO.createU(req.body);
		if (error) return res.status(422).json({ message: error });

		this.usersService
			.createAUser(createUserDto!)
			.then((data: any) => {
				return res.status(201).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	editUser = (req: Request, res: Response) => {
		const { id } = req.params;
		const sessionUserId = req.body.sessionUser.id;

		if (!protectAccountOwner(id, sessionUserId)) {
			return res
				.status(401)
				.json({ message: 'You are not the owner of this account' });
		}

		const [error, editUserDto] = EditUserDTO.editU(req.body);
		if (error) return res.status(422).json({ message: error });

		this.usersService
			.editUser(id, editUserDto!)
			.then((data: any) => {
				return res.status(201).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	disabledUser = (req: Request, res: Response) => {
		const { id } = req.params;
		const sessionUserId = req.body.sessionUser.id;

		if (!protectAccountOwner(id, sessionUserId)) {
			return res
				.status(401)
				.json({ message: 'You are not the owner of this account' });
		}

		this.usersService
			.disabledUser(id)
			.then((data: any) => {
				return res.status(204).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	login = (req: Request, res: Response) => {
		const [error, loginUserDto] = LoginUserDTO.create(req.body);

		if (error) return res.status(422).json({ message: error });

		this.usersService
			.login(loginUserDto!)
			.then((data: any) => res.status(200).json(data))
			.catch((error: unknown) => this.handleError(error, res));
	};

	register = (req: Request, res: Response) => {
		const [error, registerUserDto] = RegisterDTO.create(req.body);

		if (error) return res.status(422).json({ message: error });

		this.usersService
			.register(registerUserDto!)
			.then((data: any) => res.status(200).json(data))
			.catch((error: unknown) => this.handleError(error, res));
	};
}
