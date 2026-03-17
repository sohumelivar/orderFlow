import { payOrderService } from '../../services/payments/payments.service.js';

class PayOrderController {
    async payOrder (req, res, next) {
        try {
            const newPayment = await payOrderService(req.body.amount, req.user);
            return res.json({ payment: newPayment });
        } catch (error) {
            next(error);
        }
    }
};

export default new PayOrderController();