// auth.dto.ts
import { z } from 'zod';

export const registerSchema = z.object({
    body: z.object({
        email: z.email(),
        password: z.string().min(8),
        name: z.string().min(1).optional(),
    }).strict(),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
});

export const loginSchema = z.object({
    body: z.object({
        email: z.email(),
        password: z.string().min(8),
    }).strict(),
    query: z.object({}).optional(),
    params: z.object({}).optional(),
});
