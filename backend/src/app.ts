import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { apiRouter } from './routes/index.js';
import { notFound } from './middlewares/not-found.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';

export function createApp() {
    const app = express();

    app.use(helmet());
    app.use(cors({ origin: true }));           // налаштуєш під фронт (origin/credentials)
    app.use(express.json());
    app.use(morgan('dev'));

    app.get('/', (_req, res) => res.send('PulseWatch API'));
    app.use('/api', apiRouter);

    app.use(notFound);
    app.use(errorHandler);

    return app;
}
