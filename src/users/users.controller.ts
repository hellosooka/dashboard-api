import { BaseController } from '../common/base.controller';
import { LoggerService } from '../logger/logger.service';
import { Router, Response, Request, NextFunction } from 'express';
import { IConntrollerRoute } from '../common/route.interface';
import { HTTPError } from '../logger/errors/http-error.class';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IConntroller } from './controller.interface';


@injectable()
export class UserController extends BaseController implements IConntroller {
	constructor(@inject(TYPES.ILogger) private loggerService: LoggerService) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.login },
			{ path: '/login', method: 'post', func: this.login },
		]);
	}

	login(req: Request, res: Response, next: NextFunction): void {
		next(new HTTPError(401, 'Ошибка авторизации', 'login'));
	}

	
	register(req: Request, res: Response, next: NextFunction):void {
		this.ok(res, 'register');
	}
}
