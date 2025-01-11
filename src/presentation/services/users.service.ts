import { Users } from '../../data';

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
			throw new Error('Error getting all users');
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
			throw new Error('Account not found');
		}

		return getUser;
	}

	async createAUser(createData: any) {
		const createUser = new Users();

		createUser.name = createData.name.toLowerCase().trim();
		createUser.email = createData.email;
		createUser.password = createData.password;
		createUser.role = createData.role;

		try {
			return await createUser.save();
		} catch (error) {
			throw new Error('Error creating user');
		}
	}

	async editUser(id: string, editData: any) {
		const editUser = await this.getAUser(id);

		editUser.name = editData.name.toLowerCase().trim();
		editUser.password = editData.password.trim();

		try {
			return await editUser.save();
		} catch (error) {
			throw new Error('Error updating user');
		}
	}

	async disabledUser(id: string) {
		const deletedUser = await this.getAUser(id);

		deletedUser.status = 'disabled';

		try {
			deletedUser.save();
		} catch (error) {
			throw new Error('Error deleting user');
		}
	}
}
