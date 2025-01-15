import { Request, Response } from 'express';
import { RepairService } from '../services/repair.service';
import { CompletedRepairDTO, CreateRepairDTO, CustomError } from '../../domain';

export class RepairController {
	constructor(private readonly repairService: RepairService) {}

	private handleError = (error: unknown, res: Response) => {
		if (error instanceof CustomError) {
			return res.status(error.statusCode).json({
				message: error.message,
			});
		}
		console.log(error);
		return res.status(500).json({ message: 'Ups, something went wrong...' });
	};

	findAllPendings = (req: Request, res: Response) => {
		this.repairService
			.findAllPendings()
			.then((data: any) => {
				return res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	findAPending = (req: Request, res: Response) => {
		const { id } = req.params;

		this.repairService
			.findAPending(id)
			.then((data: any) => {
				return res.status(200).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	createADate = (req: Request, res: Response) => {
		const [error, createADateDto] = CreateRepairDTO.createR(req.body);

		if (error) return res.status(422).json({ message: error });

		this.repairService
			.createADate(createADateDto!)
			.then((data: any) => {
				return res.status(201).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	completedRepair = (req: Request, res: Response) => {
		const { id } = req.params;

		const [error, completedRepDto] = CompletedRepairDTO.CompletedR(req.body);

		if (error) return res.status(422).json({ message: error });

		this.repairService
			.completedRepair(id, completedRepDto!)
			.then((data: any) => {
				return res.status(201).json(data);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};

	cancelledRepair = (req: Request, res: Response) => {
		const { id } = req.params;

		this.repairService
			.cancelledRepair(id)
			.then((data) => {
				return res.status(200).json(null);
			})
			.catch((error: unknown) => this.handleError(error, res));
	};
}
