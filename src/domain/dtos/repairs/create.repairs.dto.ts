export class CreateRepairDTO {
	constructor(
		public readonly date: Date,
		public readonly userId: string,
		public readonly motorsNumber: string,
		public readonly description: string,
	) {}

	static createR(object: { [key: string]: any }): [string?, CreateRepairDTO?] {
		const { date, userId, motorsNumber, description } = object;
		const hoy = new Date();
		const diaCita = new Date(date);

		//Validaciones [mensaje de error, data validada]
		if (!date) return ['Date field is empty. Enter date'];
		if (diaCita.getTime() < hoy.getTime())
			return ["Appointment can't take place before or on the current date"];
		if (motorsNumber.lenght < 5)
			return ['Need a valid number (at least 5 characters'];
		if (!motorsNumber) return ['Motor Numbers is required'];
		if (!description)
			return [
				'Is required a description of the problem of the motor, so we can work as fast as posible',
			];
		if (description.lenght < 10) return ['We need more information'];

		return [
			undefined,
			new CreateRepairDTO(date, userId, motorsNumber, description),
		];
	}
}
