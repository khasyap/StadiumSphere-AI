"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
const nestjs_pino_1 = require("nestjs-pino");
const app_module_1 = require("./app.module");
const global_exception_filter_1 = require("./common/filters/global-exception.filter");
async function bootstrap() {
    const application = await core_1.NestFactory.create(app_module_1.AppModule, { bufferLogs: true });
    const logger = application.get(nestjs_pino_1.Logger);
    const configuration = application.get((config_1.ConfigService));
    application.useLogger(logger);
    application.use((0, helmet_1.default)());
    application.enableCors({ origin: configuration.getOrThrow('CORS_ORIGIN') });
    application.setGlobalPrefix(configuration.getOrThrow('API_PREFIX'));
    application.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    application.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter());
    application.enableShutdownHooks();
    if (configuration.getOrThrow('SWAGGER_ENABLED')) {
        const documentConfiguration = new swagger_1.DocumentBuilder()
            .setTitle('StadiumSphere AI API Foundation')
            .setDescription('Technical API foundation; no business capabilities are exposed.')
            .setVersion('v1')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(application, documentConfiguration);
        swagger_1.SwaggerModule.setup('api-docs', application, document);
    }
    const port = configuration.getOrThrow('PORT');
    await application.listen(port);
    logger.log({ port }, 'API foundation started');
}
void bootstrap();
//# sourceMappingURL=main.js.map