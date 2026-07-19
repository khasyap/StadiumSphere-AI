export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
export declare class LogoutDto extends RefreshTokenDto {
}
export declare class AuthenticationTokensResponseDto {
    accessToken: string;
    refreshToken: string;
}
