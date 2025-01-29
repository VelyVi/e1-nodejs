import { protectAccountOwner } from '../../config/validate-owner';
import { Repairs, RepairStatus, Users } from '../../data';
import { CompletedRepairDTO, CreateRepairDTO, CustomError } from '../../domain';
import { In } from 'typeorm';

export class RepairService {
	constructor() {}

	async findAllPendings() {
		try {
			return await Repairs.find({
				where: {
					status: In([RepairStatus.PENDING, RepairStatus.COMPLETED]),
				},
				relations: {
					user: true,
				},
				select: {
					user: {
						id: true,
						name: true,
						email: true,
						role: true,
					},
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
			relations: {
				user: true,
			},
			select: {
				user: {
					name: true,
					role: true,
					id: true,
				},
			},
		});

		if (!findPending) {
			throw CustomError.internalServer('Error fetching data.');
		}
		return findPending;
	}

	async createADate(createDate: CreateRepairDTO, user: Users) {
		const createAppointment = new Repairs();

		createAppointment.date = createDate.date;
		createAppointment.motorsNumber = createDate.motorsNumber;
		createAppointment.description = createDate.description;
		createAppointment.user = user;
		//createAppointment.status=createDate.status

		try {
			return await createAppointment.save();
		} catch (error) {
			throw CustomError.internalServer('Error creating appointment.');
		}
	}

	async completedRepair(id: string, sessionUserId: string) {
		const statusUpdated = await this.findAPending(id);
		const isOwner = protectAccountOwner(statusUpdated.user.id, sessionUserId);

		if (!isOwner)
			throw CustomError.unAuthorized('You are not authorized to modify');

		statusUpdated.status = RepairStatus.COMPLETED;

		try {
			return await statusUpdated.save();
		} catch (error) {
			throw CustomError.internalServer('Error updating data.');
		}
	}

	async cancelledRepair(id: string, sessionUserId: string) {
		const deletedRepair = await this.findAPending(id);
		const isOwner = protectAccountOwner(deletedRepair.user.id, sessionUserId);

		if (!isOwner)
			throw CustomError.unAuthorized(
				'You are not the owner, sorry you cant modify',
			);

		deletedRepair.status = RepairStatus.CANCELLED;

		try {
			return await deletedRepair.save();
		} catch (error) {
			throw CustomError.internalServer('Error deleting data.');
		}
	}
}
