import { ConfigService } from '@nestjs/config';
import type { PasswordHasher } from '../../application/interfaces/authentication.interface';
import type { ApiEnvironment } from '../../config/environment.validation';
export declare class BcryptPasswordHasher implements PasswordHasher {
    private readonly configuration;
    constructor(configuration: ConfigService<ApiEnvironment, true>);
    hash(value: string): Promise<string>;
    verify(value: string, hash: string): Promise<boolean>;
}
