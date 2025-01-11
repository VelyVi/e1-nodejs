import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('varchar', {
		length: 80,
		nullable: false,
	})
	name: string;

	@Column('varchar', {
		length: 80,
		nullable: false,
		unique: true,
	})
	email: string;

	@Column('varchar', {
		length: 80,
		nullable: false,
	})
	password: string;

	@Column('varchar', {
		length: 80,
		nullable: false,
	})
	role: string;

	@Column('varchar', {
		length: 15,
		default: 'available',
	})
	status: string;
}
