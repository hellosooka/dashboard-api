import { injectable } from 'inversify';
import { Logger } from 'tslog';
import { ILogger } from './logger.interface';

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger;

	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFilePath: 'hidden',
			displayFunctionName: false,
		});
	}

	log(...arg: unknown[]): void {
		this.logger.info(...arg);
	}

	error(...arg: unknown[]): void {
		this.logger.error(...arg);
	}

	warn(...arg: unknown[]): void {
		this.logger.warn(...arg);
	}
}
