import { LoggerService } from '../logger/logger.service';
import { Router, Response } from 'express';
import { IConntrollerRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router() {
		return this._router;
	}

	public created(res: Response) {
		return res.status(200);
	}

	public send<T>(res: Response, message: T, code: number) {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T) {
		return this.send<T>(res, message, 200);
	}

	protected bindRoutes(routes: IConntrollerRoute[]) {
		for (const route of routes) {
			this.logger.log(`${route.method} ${route.path}`);
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}
