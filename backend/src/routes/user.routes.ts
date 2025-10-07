import { Router } from 'express';
import { requireAuth } from '../middlewares/auth.middleware.js';
import { getUsers } from '../modules/user/user.controller.js';

export const userRouter = Router();

userRouter.use(requireAuth);
// all below require auth.
userRouter.get('/', getUsers);
