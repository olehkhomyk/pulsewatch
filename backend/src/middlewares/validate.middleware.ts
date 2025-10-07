import type { NextFunction, Request, Response } from 'express';
import type { ZodObject } from 'zod';
import { ZodError } from 'zod';
import { AppError } from './error.middleware.js';

export const validate =
    (schema: ZodObject) =>
        (req: Request, _res: Response, next: NextFunction) => {
            try {
                const parsed = schema.parse({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });

                const { body, query, params } = parsed as {
                    body?: unknown;
                    query?: Record<string, unknown>;
                    params?: Record<string, unknown>;
                };

                if (body !== undefined) {
                    req.body = body as any;
                }

                if (query !== undefined) {
                    const target = req.query as Record<string, unknown>;
                    for (const k of Object.keys(target)) delete (target as any)[k];
                    Object.assign(target, query);
                }

                if (params !== undefined) {
                    const target = req.params as Record<string, unknown>;
                    for (const k of Object.keys(target)) delete (target as any)[k];
                    Object.assign(target, params);
                }

                next();
            } catch (err) {
                if (err instanceof ZodError) {
                    const errors = err.issues.map(i => `${i.path.join('.')}: ${i.message}`);
                    return next(new AppError(`Validation error: ${errors.join('; ')}`, 400));
                }
                next(err);
            }
        };
