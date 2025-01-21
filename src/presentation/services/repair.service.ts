import { Repairs, RepairStatus } from '../../data';
import { CompletedRepairDTO, CreateRepairDTO, CustomError } from '../../domain';

export class RepairService {
	constructor() {}

	async findAllPendings() {
		try {
			return await Repairs.find({
				where: {
					status: RepairStatus.PENDING,
				},
			});
		} catch (error) {
			throw CustomError.internalServer('Error fetching data.');
		}
	}

	async findAPending(id: string) {
		const findPending = await Repairs.findOne({
			where: {
				id,
				status: RepairStatus.PENDING,
			},
		});

		if (!findPending) {
			throw CustomError.internalServer('Error fetching data.');
		}
		return findPending;
	}

	async createADate(createDate: CreateRepairDTO) {
		const createAppointment = new Repairs();

		createAppointment.date = createDate.date;
		createAppointment.motorsNumber = createDate.motorsNumber;
		createAppointment.description = createDate.description;
		//createAppointment.status=createDate.status

		try {
			return await createAppointment.save();
		} catch (error) {
			throw CustomError.internalServer('Error creating appointment.');
		}
	}

	async completedRepair(id: string, complData: CompletedRepairDTO) {
		const statusUpdated = await this.findAPending(id);

		statusUpdated.status = complData.status;

		try {
			return await statusUpdated.save();
		} catch (error) {
			throw CustomError.internalServer('Error updating data.');
		}
	}

	async cancelledRepair(id: string) {
		const deletedRepair = await this.findAPending(id);

		deletedRepair.status = RepairStatus.CANCELLED;

		try {
			return await deletedRepair.save();
		} catch (error) {
			throw CustomError.internalServer('Error deleting data.');
		}
	}
}
