import { Repairs } from '../../data';

export class RepairService {
	constructor() {}

	async findAllPendings() {
		try {
			return await Repairs.find({
				where: {
					status: 'pending',
				},
			});
		} catch (error) {
			throw new Error('Error getting all repairs');
		}
	}

	async findAPending(id: string) {
		const findPending = await Repairs.findOne({
			where: {
				id,
				status: 'pending',
			},
		});

		if (!findPending) {
			throw new Error('Repair not found');
		}
		return findPending;
	}

	async createADate(createDate: any) {
		const createAppointment = new Repairs();

		createAppointment.date = createDate.date;
		//createAppointment.status=createDate.status

		try {
			return await createAppointment.save();
		} catch (error) {
			throw new Error('Error creating appointment');
		}
	}

	async completedRepair(id: string, updateStatus: any) {
		const statusUpdated = await this.findAPending(id);

		statusUpdated.status = 'completed';

		try {
			return await statusUpdated.save();
		} catch (error) {
			throw new Error('Error updating status');
		}
	}

	async cancelledRepair(id: string) {
		const deletedRepair = await this.findAPending(id);

		deletedRepair.status = 'cancelled';

		try {
			return await deletedRepair.save();
		} catch (error) {
			throw new Error('Error deleting repair');
		}
	}
}
