// src/index.ts
import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// (опційно) грейсфул шатдаун
process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing server...');
    server.close(() => process.exit(0));
});
