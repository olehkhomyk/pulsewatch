import { createApp } from './app.js';
import { env } from './config/env.js';

const app = createApp();
const PORT = Number(env.PORT);

const server = app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received. Closing...');
    server.close(() => process.exit(0));
});
