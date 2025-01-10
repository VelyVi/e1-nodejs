import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Repairs extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('date', {
		nullable: false,
	})
	date: Date;

	@Column('bool', {
		default: true,
	})
	status: boolean;

	// @PrimaryGeneratedColumn('uuid')
	// userId: string
}
