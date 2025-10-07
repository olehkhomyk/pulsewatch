import type { JwtUser } from '../modules/auth/auth.types';

declare global {
    namespace Express {
        interface Request {
            user?: JwtUser;
        }
    }
}
