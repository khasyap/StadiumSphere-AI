import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { ConnectionStates, type Connection } from 'mongoose';

export type DatabaseConnectionStatus = 'connected' | 'disconnected';

@Injectable()
export class DatabaseHealthService {
  public constructor(@InjectConnection() private readonly connection: Connection) {}

  public getStatus(): DatabaseConnectionStatus {
    return this.connection.readyState === ConnectionStates.connected ? 'connected' : 'disconnected';
  }
}
