import { Router, Response, Request, NextFunction } from 'express';

export interface IConntroller {
	login(req: Request, res: Response, next: NextFunction): void;
	register(req: Request, res: Response, next: NextFunction): void;
}
