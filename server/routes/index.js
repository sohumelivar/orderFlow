import { Router } from 'express';
import authRouter from './authRouter.js';
import orderRouter from './orderRouter.js';
import statsRouter from './statsRouter.js';
import paymentOrder from './paymentRouter.js'

const router = Router();

router.use('/auth', authRouter);
router.use('/orders', orderRouter);
router.use('/payments', paymentOrder);
router.use('/stats', statsRouter);

export default router;