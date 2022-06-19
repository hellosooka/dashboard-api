import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';

export interface IExeptionFilter {
	catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
