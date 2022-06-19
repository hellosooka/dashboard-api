import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { Server } from 'node:http';
import { ExeptionFilter } from './logger/errors/exeption.filter';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { UserController } from './users/users.controller';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExeptionFiltres() {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.useExeptionFiltres();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на https://localhost:${this.port}`);
	}
}
