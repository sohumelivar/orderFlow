import { Router } from 'express';
import pipePairsRouter from './pipePairsRouter.js';
import authRouter from './authRouter.js';
import orderRouter from './orderRouter.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/pipe_pairs', pipePairsRouter);
router.use('/orders', orderRouter);

export default router;