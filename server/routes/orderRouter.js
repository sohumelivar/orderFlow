import { Router } from 'express';
import { authRequired } from '../middlewares/checkAuth.js';
import orderController from '../controllers/orderControllers/createOrder.controller.js';
import getActiveController from '../controllers/orderControllers/getActive.controller.js';
import updateOrderController from '../controllers/orderControllers/updateOrder.controller.js';

const router = Router();

router.post('/create', authRequired, orderController.createOrder);
router.get('/active', authRequired, getActiveController.getActive);
router.patch('/update', authRequired, updateOrderController.updateOrder);

export default router;