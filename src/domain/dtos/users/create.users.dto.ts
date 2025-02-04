import { regularExp } from '../../../config/regular-exp';
import { Role } from '../../../data';

export class CreateUserDTO {
	constructor(
		public readonly name: string,
		public readonly email: string,
		public readonly password: string,
		public readonly role: Role,
	) {}

	static createU(object: { [key: string]: any }): [string?, CreateUserDTO?] {
		const { name, email, password, role } = object;

		if (!name) return ['Name field empty.'];
		if (name.length < 2) return ['Name is too short.'];
		if (name.length > 80) return ['Name is too long.'];

		if (!email) return ['Email field empty.'];
		if (!regularExp.email.test(email)) return ['Invalid email.'];

		if (!password) return ['Password field empty.'];
		if (!regularExp.password.test(password))
			return [
				'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.',
			];

		return [undefined, new CreateUserDTO(name, email, password, role)];
	}
}
