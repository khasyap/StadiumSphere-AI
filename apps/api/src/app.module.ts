import { Module, type MiddlewareConsumer, type NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import pino from 'pino';

import { HealthModule } from './common/health/health.module';
import { CorrelationIdMiddleware } from './common/middleware/correlation-id.middleware';
import { type ApiEnvironment, validateEnvironment } from './config/environment.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvironment,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        logger: pino({
          level: (process.env.LOG_LEVEL ?? 'info') as pino.LevelWithSilentOrString,
          redact: ['req.headers.authorization', 'req.headers.cookie'],
        }),
      },
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configuration: ConfigService<ApiEnvironment, true>) => [
        {
          limit: configuration.getOrThrow('RATE_LIMIT_MAX'),
          ttl: configuration.getOrThrow('RATE_LIMIT_TTL_MS'),
        },
      ],
    }),
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
