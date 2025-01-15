import { encriptAdapter, JwtAdapter } from '../../config';
import { Users } from '../../data';
import { CreateUserDTO, CustomError, EditUserDTO } from '../../domain';
import { LoginUserDTO } from '../../domain/dtos/users/login.user.dto';
import { RegisterDTO } from '../../domain/dtos/users/register.user.dto';

export class UsersService {
	constructor() {}

	async getAllUsers() {
		try {
			return await Users.find({
				where: {
					status: 'available',
				},
			});
		} catch (error) {
			throw CustomError.internalServer('Error fetching data.');
		}
	}

	async getAUser(id: string) {
		const getUser = await Users.findOne({
			where: {
				id,
				status: 'available',
			},
		});

		if (!getUser) {
			throw CustomError.internalServer('Error fetching data.');
		}

		return getUser;
	}

	async getUserbyEmail(email: string) {
		const user = await Users.findOne({
			where: {
				email: email,
				status: 'available',
			},
		});
		if (!user)
			throw CustomError.notFoud(`User with email: ${email} not found.`);
		return user;
	}

	async createAUser(createData: CreateUserDTO) {
		const createUser = new Users();

		createUser.name = createData.name.toLowerCase().trim();
		createUser.email = createData.email;
		createUser.password = createData.password;
		createUser.role = createData.role;

		try {
			return await createUser.save();
		} catch (error) {
			throw CustomError.internalServer('Error creating user.');
		}
	}

	async editUser(id: string, editData: EditUserDTO) {
		const editUser = await this.getAUser(id);

		editUser.name = editData.name.toLowerCase().trim();
		editUser.password = editData.password.trim();

		try {
			return await editUser.save();
		} catch (error) {
			throw CustomError.internalServer('Error updating data.');
		}
	}

	async disabledUser(id: string) {
		const deletedUser = await this.getAUser(id);

		deletedUser.status = 'disabled';

		try {
			deletedUser.save();
		} catch (error) {
			throw CustomError.internalServer('Error deleting data.');
		}
	}

	async login(credentials: LoginUserDTO) {
		const user = await this.getUserbyEmail(credentials.email);

		const isMatching = encriptAdapter.compare(
			credentials.password,
			user.password,
		);
		if (!isMatching) throw CustomError.unAuthorized('Invalid credentials');

		const token = await JwtAdapter.generateToken({ id: user.id });
		if (!token) throw CustomError.internalServer('Error while creating JWT');

		return {
			token: token,
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				role: user.role,
			},
		};
	}

	async register(userData: RegisterDTO) {
		const user = new Users();

		user.name = userData.name;
		user.email = userData.email;
		user.password = userData.password;
		user.role = userData.role;

		try {
			const dbUser = await user.save();
			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				role: dbUser.role,
			};
		} catch (error: any) {
			if (error.code === '23505') {
				throw CustomError.badRequest(
					`User with email: ${userData.email} already exist`,
				);
			}
			throw CustomError.internalServer('Error while creating user');
		}
	}
}
