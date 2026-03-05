import { Router } from 'express';
import { authRequired } from '../middlewares/checkAuth.js';
import orderController from '../controllers/orderControllers/createOrder.controller.js';
import getActiveOrdersController from '../controllers/orderControllers/getActiveOrders.controller.js';
import updateOrderController from '../controllers/orderControllers/updateOrder.controller.js';
import completeOrderController from '../controllers/orderControllers/completeOrder.controller.js';
import getCompletedOrdersController from '../controllers/orderControllers/getCompletedOrders.controller.js';

const router = Router();

router.post('/create', authRequired, orderController.createOrder);
router.get('/active', authRequired, getActiveOrdersController.getActiveOrders);
router.get('/completed', authRequired, getCompletedOrdersController.getCompletedOrders);
router.patch('/update', authRequired, updateOrderController.updateOrder);
router.patch('/complete', authRequired, completeOrderController.completeOrder);

export default router;