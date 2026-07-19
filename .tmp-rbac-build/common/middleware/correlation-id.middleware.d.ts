import { type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
export declare class CorrelationIdMiddleware implements NestMiddleware {
    use(request: Request, response: Response, next: NextFunction): void;
}
