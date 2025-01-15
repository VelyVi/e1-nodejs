import { regularExp } from '../../../config';

export class RegisterDTO {
	constructor(
		public readonly name: string,
		public readonly email: string,
		public readonly password: string,
		public readonly role: string,
	) {}

	static create(object: { [key: string]: any }): [string?, RegisterDTO?] {
		const { name, email, password, role } = object;

		if (!name) return ['Missing name'];
		if (!email) return ['Missing email'];
		if (!regularExp.email.test(email)) return ['Invalid Email'];
		if (!password) return ['Password field empty'];
		if (!regularExp.password.test(password))
			return [
				'The password must be at least 6 characters long and contain at least one uppercase letter, one lowercasa letter, and one special character',
			];

		if (!role) return ['Missing role'];

		return [undefined, new RegisterDTO(name, email, password, role)];
	}
}
