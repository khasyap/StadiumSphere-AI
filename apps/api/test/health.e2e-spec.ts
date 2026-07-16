import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';

import { AppModule } from '../src/app.module';

describe('API foundation health', () => {
  let application: INestApplication;

  beforeAll(async () => {
    const moduleReference = await Test.createTestingModule({ imports: [AppModule] }).compile();
    application = moduleReference.createNestApplication();
    application.setGlobalPrefix('api/v1');
    await application.init();
  });

  afterAll(async () => {
    await application.close();
  });

  it('returns the API health contract and correlation identifier', async () => {
    const response = await request(application.getHttpServer()).get('/api/v1/health').expect(200);

    expect(response.body).toMatchObject({
      service: 'api',
      status: 'ok',
      version: '0.1.0',
    });
    expect(response.body.timestamp).toEqual(expect.any(String));
    expect(response.headers['x-correlation-id']).toEqual(expect.any(String));
  });
});
