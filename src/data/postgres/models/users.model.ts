import {
	BaseEntity,
	BeforeInsert,
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { encriptAdapter } from '../../../config';

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

	@BeforeInsert()
	encryptedPassword() {
		this.password = encriptAdapter.hash(this.password);
	}
}
