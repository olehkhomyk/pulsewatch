import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { prisma } from '../../db/prisma.js';
import { env } from '../../config/env.js';
import type { JwtUser } from './auth.types.js';
import { AppError } from '../../middlewares/error.middleware.js';

export class AuthService {
    static async registerUser(email: string, password: string, name?: string) {
        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) throw new AppError('Email already in use', 409);

        const passwordHash = await argon2.hash(password); // auto salt
        const user = await prisma.user.create({
            data: { email, passwordHash, name, role: 'user' }
        });
        return user;
    }

    static async loginUser(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new AppError('Invalid credentials', 401);

        const ok = await argon2.verify(user.passwordHash, password);
        if (!ok) throw new AppError('Invalid credentials', 401);

        const payload: JwtUser = { sub: user.id, email: user.email, role: user.role as any };
        const accessToken = jwt.sign(
            payload,
            env.JWT_ACCESS_SECRET,
            { expiresIn: env.JWT_ACCESS_EXPIRES_IN } as jwt.SignOptions
        );
        return { accessToken, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
    }

    static async getMe(userId: string) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new AppError('User not found', 404);
        return { id: user.id, email: user.email, name: user.name, role: user.role };
    }
}
