import { regularExp } from '../../../config/regular-exp';

export class EditUserDTO {
	constructor(public readonly name: string, public readonly password: string) {}

	static editU(object: { [key: string]: any }): [string?, EditUserDTO?] {
		const { name, password } = object;

		if (!name) return ['Name field empty.'];
		if (name.length < 2) return ['Name is too short.'];
		if (name.length > 80) return ['Name is too long.'];

		if (!password) return ['Password field empty.'];
		if (!regularExp.password.test(password))
			return [
				'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, and one special character.',
			];

		return [undefined, new EditUserDTO(name, password)];
	}
}
