import type { Request, Response } from 'express';
import { listUsers } from './user.service.js';

export async function getUsers(_req: Request, res: Response) {
    const users = await listUsers();
    res.json(users);
}
