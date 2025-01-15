export class CreateRepairDTO {
	constructor(public readonly date: Date) {}

	static createR(object: { [key: string]: any }): [string?, CreateRepairDTO?] {
		const { date } = object;
		const hoy = new Date();
		const diaCita = new Date(date);

		//Validaciones [mensaje de error, data validada]
		if (!date) return ['Date field is empty. Enter date'];
		if (diaCita.getTime() < hoy.getTime())
			return ["Appointment can't take place before or on the current date"];

		return [undefined, new CreateRepairDTO(date)];
	}
}
