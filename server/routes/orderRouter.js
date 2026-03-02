import { Router } from 'express';
import orderController from '../controllers/orderControllers/createOrder.controller.js';
import { authRequired } from '../middlewares/checkAuth.js';

const router = Router();

router.post('/create', authRequired, orderController.createOrder);

export default router;