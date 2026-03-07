import { Router } from 'express';
import { authRequired } from '../middlewares/checkAuth.js';
import orderController from '../controllers/orderControllers/createOrder.controller.js';
import getActiveOrdersController from '../controllers/orderControllers/getActiveOrders.controller.js';
import updateOrderController from '../controllers/orderControllers/updateOrder.controller.js';
import completeOrderController from '../controllers/orderControllers/completeOrder.controller.js';
import getCompletedOrdersController from '../controllers/orderControllers/getCompletedOrders.controller.js';
import deleteOrderController from '../controllers/orderControllers/deleteOrder.controller.js';
import updateOrderStatusController from '../controllers/orderControllers/updateOrderStatus.controller.js';

const router = Router();

router.post('/create', authRequired, orderController.createOrder);
router.get('/active', authRequired, getActiveOrdersController.getActiveOrders);
router.get('/completed', authRequired, getCompletedOrdersController.getCompletedOrders);
router.patch('/update', authRequired, updateOrderController.updateOrder);
router.patch('/complete', authRequired, completeOrderController.completeOrder);
router.patch('/update-status/:id', authRequired, updateOrderStatusController.updateOrderStatus);
router.delete('/delete/:id', authRequired, deleteOrderController.deleteOrder);

export default router;