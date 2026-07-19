import type { AuthenticationTokenService, PasswordHasher } from '../interfaces/authentication.interface';
import type { UserRepositoryPort } from '../interfaces/application-repository.interface';
export interface LoginCommand {
    email: string;
    password: string;
}
export interface AuthenticationTokens {
    readonly accessToken: string;
    readonly refreshToken: string;
}
export declare class AuthenticationApplicationService {
    private readonly userRepository;
    private readonly passwordHasher;
    private readonly tokenService;
    constructor(userRepository: UserRepositoryPort, passwordHasher: PasswordHasher, tokenService: AuthenticationTokenService);
    login(command: LoginCommand): Promise<AuthenticationTokens>;
    logout(refreshToken: string): Promise<void>;
    refresh(refreshToken: string): Promise<AuthenticationTokens>;
    private getRefreshTokenUser;
    private issueTokens;
    private persistRefreshTokenHash;
}
