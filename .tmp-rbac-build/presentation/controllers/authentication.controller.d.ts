import { AuthenticationApplicationService } from '../../application';
import { AuthenticationTokensResponseDto, LoginDto, LogoutDto, RefreshTokenDto } from '../dto/authentication.dto';
import { SuccessResponse } from '../responses/success.response';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationApplicationService);
    login(dto: LoginDto): Promise<SuccessResponse<AuthenticationTokensResponseDto>>;
    refresh(dto: RefreshTokenDto): Promise<SuccessResponse<AuthenticationTokensResponseDto>>;
    logout(dto: LogoutDto): Promise<SuccessResponse<undefined>>;
}
