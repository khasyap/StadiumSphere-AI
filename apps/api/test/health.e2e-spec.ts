import { Test } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/mongoose';
import type { INestApplication } from '@nestjs/common';
import { ConnectionStates, type Connection } from 'mongoose';
import request from 'supertest';
import type Redis from 'ioredis';

import { AppModule } from '../src/app.module';
import { REDIS_CLIENT } from '../src/infrastructure/redis/redis.constants';
import { BookingController } from '../src/presentation/controllers/booking.controller';
import { OrganizationController } from '../src/presentation/controllers/organization.controller';
import { StadiumController } from '../src/presentation/controllers/stadium.controller';
import { TeamController } from '../src/presentation/controllers/team.controller';
import { UserController } from '../src/presentation/controllers/user.controller';
import { VenueController } from '../src/presentation/controllers/venue.controller';

describe('API foundation health', () => {
  let application: INestApplication;

  beforeAll(async () => {
    const usersQuery = {
      exec: jest.fn().mockResolvedValue([]),
      limit: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
    };
    const mongoConnection = {
      close: jest.fn().mockResolvedValue(undefined),
      models: {
        BookingPersistence: {},
        EventPersistence: {},
        OrganizationPersistence: {},
        SportPersistence: {},
        StadiumPersistence: {},
        TeamPersistence: {},
        UserPersistence: {
          countDocuments: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(0) }),
          find: jest.fn().mockReturnValue(usersQuery),
        },
        VenuePersistence: {},
      },
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

  it('registers presentation controllers and resolves a REST route through dependency injection', async () => {
    await request(application.getHttpServer()).get('/api/v1/users').expect(200).expect({
      success: true,
      message: 'User list retrieved.',
      data: [],
    });

    expect(application.get(UserController)).toBeDefined();
    expect(application.get(StadiumController)).toBeDefined();
    expect(application.get(VenueController)).toBeDefined();
    expect(application.get(TeamController)).toBeDefined();
    expect(application.get(OrganizationController)).toBeDefined();
    expect(application.get(BookingController)).toBeDefined();
  });
});
