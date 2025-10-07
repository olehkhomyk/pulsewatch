import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { registerSchema, loginSchema } from '../modules/auth/auth.dto.js';
import { AuthController } from '../modules/auth/auth.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

export const authRouter = Router();

authRouter.post('/register', validate(registerSchema), AuthController.register);
authRouter.post('/login', validate(loginSchema), AuthController.login);

authRouter.use(requireAuth)
// all below require auth.
authRouter.get('/me', AuthController.me);
