import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { AppError } from '../../middlewares/error.middleware.js';

export class AuthController {
    static async register(req: Request, res: Response) {
        const { email, password, name } = req.body;

        try {
            const user = await AuthService.registerUser(email, password, name);
            res.status(201).json({ 
                user: { 
                    id: user.id, 
                    email: user.email, 
                    name: user.name, 
                    role: user.role 
                } 
            });
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                console.error('Registration error:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const { accessToken, user } = await AuthService.loginUser(email, password);
            res.json({ accessToken, user });
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                console.error('Login error:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    static async me(req: Request, res: Response) {
        const userId = req.user?.sub;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        try {
            const user = await AuthService.getMe(userId);
            return res.json(user);
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(error.statusCode).json({ message: error.message });
            } else {
                console.error('Get me error:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
}
