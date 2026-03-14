import { completeOrder } from '../../services/orders/orders.service.js';

class CompleteOrderController {
    async completeOrder (req, res, next) {
        try {
            const order = await completeOrder(req.body, req.user.uid);
            return res.json(order)
        } catch (error) {
            next(error);
        }
    }
};

export default new CompleteOrderController();