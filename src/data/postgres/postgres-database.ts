import { DataSource } from 'typeorm';
import { Users } from './models/users.model';
import { Repairs } from './models/repairs.model';

interface Options {
	host: string;
	port: number;
	username: string;
	password: string;
	database: string;
}

export class PostgresDatabase {
	public datasource: DataSource;
	constructor(options: Options) {
		this.datasource = new DataSource({
			type: 'postgres',
			host: options.host,
			port: options.port,
			username: options.username,
			password: options.password,
			database: options.database,
			entities: [Users, Repairs],
			synchronize: true,
			ssl: {
				rejectUnauthorized: false,
			},
		});
	}

	async connect() {
		try {
			await this.datasource.initialize();
			console.log('database connected 😁');
		} catch (error) {
			console.log(error);
		}
	}
}
