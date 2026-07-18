import { Test } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import type { INestApplication } from '@nestjs/common';
import { ConnectionStates, type Connection } from 'mongoose';
import request from 'supertest';
import type Redis from 'ioredis';

import { STADIUM_APPLICATION_SERVICE } from '../src/application';
import { AppModule } from '../src/app.module';
import { UserRole } from '../src/domain';
import { REDIS_CLIENT } from '../src/infrastructure/redis/redis.constants';

describe('RBAC authorization', () => {
  let application: INestApplication;

  beforeAll(async () => {
    const mongoConnection = {
      close: jest.fn().mockResolvedValue(undefined),
      models: {
        BookingPersistence: {},
        EventPersistence: {},
        OrganizationPersistence: {},
        SportPersistence: {},
        StadiumPersistence: {},
        TeamPersistence: {},
        UserPersistence: {},
        VenuePersistence: {},
      },
      readyState: ConnectionStates.disconnected,
    } as unknown as Connection;
    const stadiumService = {
      create: jest.fn(async () => ({ id: 'stadium-1' })),
      delete: jest.fn(async () => undefined),
      findAll: jest.fn(async () => []),
      findById: jest.fn(async () => ({ id: 'stadium-1' })),
      update: jest.fn(async () => ({ id: 'stadium-1' })),
    };
    const moduleReference = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(getConnectionToken())
      .useValue(mongoConnection)
      .overrideProvider(REDIS_CLIENT)
      .useValue({ status: 'end' } as Redis)
      .overrideProvider(STADIUM_APPLICATION_SERVICE)
      .useValue(stadiumService)
      .compile();

    application = moduleReference.createNestApplication();
    application.setGlobalPrefix('api/v1');
    await application.init();
  });

  afterAll(async () => {
    await application.close();
  });

  it('returns 401 without a JWT, 403 for USER on a manager route, and 200 for ADMIN', async () => {
    await request(application.getHttpServer()).get('/api/v1/stadiums').expect(401);

    await request(application.getHttpServer())
      .post('/api/v1/stadiums')
      .set('Authorization', `Bearer ${await accessToken(UserRole.USER)}`)
      .send({ capacity: 50000, name: 'StadiumSphere Arena' })
      .expect(403);

    await request(application.getHttpServer())
      .get('/api/v1/stadiums')
      .set('Authorization', `Bearer ${await accessToken(UserRole.ADMIN)}`)
      .expect(200)
      .expect({ success: true, message: 'Stadium list retrieved.', data: [] });
  });

  async function accessToken(role: UserRole): Promise<string> {
    return new JwtService().signAsync(
      { email: 'fan@example.com', role, sub: 'user-1', tokenType: 'access' },
      { secret: process.env.JWT_ACCESS_SECRET ?? '' },
    );
  }
});
