import { ConnectionStates, type Connection } from 'mongoose';

import { DatabaseHealthService } from './database.health.service';

describe('DatabaseHealthService', () => {
  it('reports connected only when the MongoDB connection is ready', () => {
    const connectedService = new DatabaseHealthService({
      readyState: ConnectionStates.connected,
    } as Connection);
    const disconnectedService = new DatabaseHealthService({
      readyState: ConnectionStates.disconnected,
    } as Connection);

    expect(connectedService.getStatus()).toBe('connected');
    expect(disconnectedService.getStatus()).toBe('disconnected');
  });
});
