export class CompletedRepairDTO {
	constructor(public readonly status: string) {}

	static CompletedR(object: {
		[key: string]: any;
	}): [string?, CompletedRepairDTO?] {
		const { status } = object;

		//Las validaciones necesarias.
		if (!status) return ['Missing status'];
		if (status.length > 9)
			return ['Status invalid, please retry with a valid value'];

		return [undefined, new CompletedRepairDTO(status)];
	}
}
