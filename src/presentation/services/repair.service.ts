export class RepairService {
	constructor() {}

	async findAllPendings() {
		return {
			message: 'Obtener el listado de todos los pendientes',
		};
	}

	async findAPending() {
		return {
			message: 'Obtener una moto especifica a reparar',
		};
	}

	async createADate() {
		return {
			message: 'Agendar cita y quien solicita reparacion',
		};
	}

	async completedRepair() {
		return {
			message: 'Ha sido completada la reparacion',
		};
	}

	async cancelledRepair() {
		return {
			message: 'Se ha cancelado la repacion, CANCELADO',
		};
	}
}
