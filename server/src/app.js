import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import apiRouter from '../routes/index.js';
import { errorHandler, notFound } from '../middlewares/errorHandler.js';

export function createApp() {
    const app = express();
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    
    app.use('/api', apiRouter);

    app.use(notFound);
    app.use(errorHandler);

    return app;
};