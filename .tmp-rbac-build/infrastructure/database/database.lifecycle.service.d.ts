import { type OnApplicationShutdown } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { type Connection } from 'mongoose';
export declare class DatabaseLifecycleService implements OnApplicationShutdown {
    private readonly connection;
    private readonly logger;
    constructor(connection: Connection, logger: Logger);
    onApplicationShutdown(signal?: string): Promise<void>;
}
