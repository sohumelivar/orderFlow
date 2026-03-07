import { Router } from 'express';
import pipePairsRouter from './pipePairsRouter.js';
import authRouter from './authRouter.js';
import orderRouter from './orderRouter.js';
import statsRouter from './statsRouter.js';
import paymentOrder from './paymentRouter.js'

const router = Router();

router.use('/auth', authRouter);
router.use('/pipe_pairs', pipePairsRouter);
router.use('/orders', orderRouter);
router.use('/stats', statsRouter);
router.use('/payments', paymentOrder);

export default router;