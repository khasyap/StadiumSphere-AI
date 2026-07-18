import { HttpStatus } from '@nestjs/common';
import type { ArgumentsHost } from '@nestjs/common';

import { ApplicationEntityNotFoundException } from '../../application/exceptions/application-entity-not-found.exception';
import { ApplicationValidationException } from '../../application/exceptions/application-validation.exception';
import { GlobalExceptionFilter } from './global-exception.filter';

interface ResponseDouble {
  json(body: unknown): ResponseDouble;
  status(code: number): ResponseDouble;
}

const createHost = (response: ResponseDouble): ArgumentsHost =>
  ({
    switchToHttp: () => ({
      getRequest: () => ({ correlationId: 'correlation-1' }),
      getResponse: () => response,
    }),
  }) as ArgumentsHost;

describe('GlobalExceptionFilter', () => {
  it('maps application validation failures to HTTP 400', () => {
    const response: jest.Mocked<ResponseDouble> = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };

    new GlobalExceptionFilter().catch(
      new ApplicationValidationException('Referenced Sport is invalid.'),
      createHost(response),
    );

    expect(response.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        correlationId: 'correlation-1',
        message: 'Referenced Sport is invalid.',
        statusCode: HttpStatus.BAD_REQUEST,
      }),
    );
  });

  it('maps application not-found failures to HTTP 404', () => {
    const response: jest.Mocked<ResponseDouble> = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
    };

    new GlobalExceptionFilter().catch(
      new ApplicationEntityNotFoundException('sport-1'),
      createHost(response),
    );

    expect(response.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Entity with identifier "sport-1" was not found.',
        statusCode: HttpStatus.NOT_FOUND,
      }),
    );
  });
});
