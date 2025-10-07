import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import type { JwtUser } from '../modules/auth/auth.types.js';
import { AppError } from './error.middleware.js';

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
    const header = req.headers.authorization; // "Bearer <token>"
    if (!header?.startsWith('Bearer ')) {
        return next(new AppError('Unauthorized', 401));
    }
    const token = header.slice(7);
    try {
        const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtUser;
        req.user = payload;
        return next();
    } catch {
        return next(new AppError('Invalid or expired token', 401));
    }
}
