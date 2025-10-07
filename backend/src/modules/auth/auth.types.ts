export interface JwtUser {
    sub: string;       // userId
    email: string;
    role: 'user' | 'admin';
    iat?: number;
    exp?: number;
}
