import { Router } from 'express';
import { authRequired } from '../middlewares/checkAuth.js';
import payOrderController from '../controllers/paymentController/payOrder.controller.js';
import completePaymentController from '../controllers/paymentController/completePayment.controller.js';
import rejectPaymentController from '../controllers/paymentController/rejectPayment.controller.js';

const router = Router();

router.post('/pay_order', authRequired, payOrderController.payOrder);
router.patch('/complete/:id', authRequired, completePaymentController.completePayment);
router.patch('/reject/:id', authRequired, rejectPaymentController.rejectPayment);

export default router;