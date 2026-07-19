import { type Connection } from 'mongoose';
export type DatabaseConnectionStatus = 'connected' | 'disconnected';
export declare class DatabaseHealthService {
    private readonly connection;
    constructor(connection: Connection);
    getStatus(): DatabaseConnectionStatus;
}
