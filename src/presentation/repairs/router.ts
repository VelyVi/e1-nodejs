import { Router } from 'express';
import { RepairController } from './controller';
import { RepairService } from '../services/repair.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { Role } from '../../data';

export class RepairRoutes {
	static get routes(): Router {
		const router = Router();

		const repairService = new RepairService();
		const repairController = new RepairController(repairService);

		//Protegemos aquí para que solo alguien loggeado lo pueda ver
		router.use(AuthMiddleware.protect);
		router.post('/', repairController.createADate);

		//Agregamos la capa de restricción para que solo alguien con rol EMPLOYEE pueda hacer y deshacer

		router.get(
			'/',
			AuthMiddleware.restrictTo(Role.EMPLOYEE),
			repairController.findAllPendings,
		);
		router.get(
			'/:id',
			AuthMiddleware.restrictTo(Role.EMPLOYEE),
			repairController.findAPending,
		);
		router.patch(
			'/:id',
			AuthMiddleware.restrictTo(Role.EMPLOYEE),
			repairController.completedRepair,
		);
		router.delete(
			'/:id',
			AuthMiddleware.restrictTo(Role.EMPLOYEE),
			repairController.cancelledRepair,
		);

		return router;
	}
}
