import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { Request, Response } from 'express';

interface ErrorResponseBody {
  readonly correlationId: string;
  readonly message: string;
  readonly statusCode: number;
  readonly timestamp: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	
	/*public catch(exception: unknown, host: ArgumentsHost): void {
	  console.error('\n========== GLOBAL EXCEPTION ==========');

	  if (exception instanceof Error) {
		console.error('Exception Type :', exception.constructor.name);
		console.error('Message        :', exception.message);
		console.error('Stack Trace:');
		console.error(exception.stack);
	  } else {
		console.error('Unknown Exception:');
		console.error(exception);
	  }

	  console.error('======================================\n');

	  const context = host.switchToHttp();
	  const response = context.getResponse<Response>();
	  const request = context.getRequest<Request>();

	  const statusCode =
		exception instanceof HttpException
		  ? exception.getStatus()
		  : HttpStatus.INTERNAL_SERVER_ERROR;

	  const responseBody: ErrorResponseBody = {
		correlationId: request.correlationId ?? 'unavailable',
		message: this.getMessage(exception),
		statusCode,
		timestamp: new Date().toISOString(),
	  };

	  response.status(statusCode).json(responseBody);
	}*/
  public catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const responseBody: ErrorResponseBody = {
      correlationId: request.correlationId ?? 'unavailable',
      message: this.getMessage(exception),
      statusCode,
      timestamp: new Date().toISOString(),
    };

    response.status(statusCode).json(responseBody);
  }

  private getMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        return exceptionResponse;
      }

      if ('message' in exceptionResponse) {
        const { message } = exceptionResponse;
        return Array.isArray(message) ? message.join(', ') : String(message);
      }
    }

    return 'An unexpected platform error occurred.';
  }
}
