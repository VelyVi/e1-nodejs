import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config';
import { Role, Status, Users } from '../../data';

export class AuthMiddleware {
	static async protect(req: Request, res: Response, next: NextFunction) {
		const authorization = req.header('Authorization');

		if (!authorization)
			return res
				.status(401)
				.json({ message: 'No token provided. Please try again' });

		if (!authorization.startsWith('Bearer '))
			return res.status(401).json({ message: 'Invalid token.' });

		const token = authorization.split(' ').at(1) || '';

		try {
			const payload = (await JwtAdapter.validateToken(token)) as { id: string };
			if (!payload) return res.status(401).json({ message: 'Invalid token.' });

			const user = await Users.findOne({
				where: {
					id: payload.id,
					status: Status.AVAILABLE,
				},
			});

			if (!user) return res.status(401).json({ message: 'Invalid user.' });
			req.body.sessionUser = user;
			next();
		} catch (error: any) {
			console.log(error);
			return res.status(500).json({ message: 'Internal Server Error.' });
		}
	}

	static restrictTo = (...roles: Role[]) => {
		return (req: Request, res: Response, next: NextFunction) => {
			if (!roles.includes(req.body.sessionUser.role)) {
				return res.status(401).json({
					message: 'Unauthorized. Only employees can see and modify.',
				});
			}
			next();
		};
	};
}
