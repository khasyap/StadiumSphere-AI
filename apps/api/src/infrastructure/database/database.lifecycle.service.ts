import { Injectable, type OnApplicationShutdown } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Logger } from 'nestjs-pino';
import { ConnectionStates, type Connection } from 'mongoose';

@Injectable()
export class DatabaseLifecycleService implements OnApplicationShutdown {
  public constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly logger: Logger,
  ) {}

  public async onApplicationShutdown(signal?: string): Promise<void> {
    if (this.connection.readyState === ConnectionStates.disconnected) {
      return;
    }

    this.logger.log({ signal: signal ?? 'application' }, 'MongoDB disconnecting');
    await this.connection.close();
    this.logger.log('MongoDB disconnected');
  }
}
