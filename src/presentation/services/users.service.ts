export class UsersService {
	constructor() {}

	async getAllUsers() {
		return {
			message: 'Obteniendo el listado de todos los usuarios en la database',
		};
	}

	async getAUser() {
		return {
			message: 'Obteniendo un usuario especifico en la database',
		};
	}

	async createAUser() {
		return {
			message: 'Crear una cuenta puede ser empleado o cliente',
		};
	}

	async editUser() {
		return {
			message: 'Cambiar ya sea email o name de usuario',
		};
	}

	async disabledUser() {
		return {
			message: 'Cambiar el user a disabled',
		};
	}
}
