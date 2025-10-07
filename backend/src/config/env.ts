import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
    NODE_ENV: z.enum(['development','test','production']).default('development'),
    PORT: z.string().default('3000'),
    DATABASE_URL: z.string().min(1),
    JWT_ACCESS_SECRET: z.string().min(30),
    JWT_ACCESS_EXPIRES_IN: z.string().default('15m')
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
    console.error('❌ Invalid environment variables:', z.treeifyError(parsed.error));
    process.exit(1);
}

export const env = parsed.data;
