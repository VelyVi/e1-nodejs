import { regularExp } from '../../../config';

export class LoginUserDTO {
	constructor(
		public readonly email: string,
		public readonly password: string,
	) {}

	static create(object: { [key: string]: any }): [string?, LoginUserDTO?] {
		const { email, password } = object;

		if (!email) return ['Missing email'];
		if (!regularExp.email.test(email)) return ['Invalid Email'];
		if (!password) return ['Missing password'];
		if (!regularExp.password.test(password))
			return [
				'Invalid password, must be at least 6 characters long and contain at least one uppercase letter, one lowercasa letter, and one special character',
			];

		return [undefined, new LoginUserDTO(email, password)];
	}
}
