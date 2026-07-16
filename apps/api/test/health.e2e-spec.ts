import { Test } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/mongoose';
import type { INestApplication } from '@nestjs/common';
import { ConnectionStates, type Connection } from 'mongoose';
import request from 'supertest';
import type Redis from 'ioredis';

import { AppModule } from '../src/app.module';
import { REDIS_CLIENT } from '../src/infrastructure/redis/redis.constants';

describe('API foundation health', () => {
  let application: INestApplication;

  beforeAll(async () => {
    const mongoConnection = {
      close: jest.fn().mockResolvedValue(undefined),
      readyState: ConnectionStates.disconnected,
    } as unknown as Connection;
    const redisClient = { status: 'end' } as Redis;
    const moduleReference = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(getConnectionToken())
      .useValue(mongoConnection)
      .overrideProvider(REDIS_CLIENT)
      .useValue(redisClient)
      .compile();
    application = moduleReference.createNestApplication();
    application.setGlobalPrefix('api/v1');
    await application.init();
  });

  afterAll(async () => {
    await application.close();
  });

  it('returns a degraded health response when infrastructure is unavailable', async () => {
    const response = await request(application.getHttpServer()).get('/api/v1/health').expect(200);

    expect(response.body).toMatchObject({
      service: 'api',
      status: 'degraded',
      version: '0.1.0',
    });
    expect(response.body.database).toBe('disconnected');
    expect(response.body.redis).toBe('disconnected');
    expect(response.body.timestamp).toEqual(expect.any(String));
    expect(response.headers['x-correlation-id']).toEqual(expect.any(String));
  });
});
