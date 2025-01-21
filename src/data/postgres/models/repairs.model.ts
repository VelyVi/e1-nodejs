import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RepairStatus {
	PENDING = 'PENDING',
	COMPLETED = 'COMPLETED',
	CANCELLED = 'CANCELLED',
}

@Entity()
export class Repairs extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('date', {
		nullable: false,
	})
	date: Date;

	@Column('varchar', {
		nullable: false,
	})
	motorsNumber: string;

	@Column('varchar', {
		nullable: false,
	})
	description: string;

	@Column('enum', {
		enum: RepairStatus,
		default: RepairStatus.PENDING,
	})
	status: RepairStatus;

	@Column('varchar', {
		nullable: true,
	})
	userId: string;
}
