import ApiError from '../../src/utils/ApiError.js';
import { createOrderService } from '../../services/orders/orders.service.js';

class CreateOrderController {
    async createOrder (req, res, next) {
        try {
            const data = req.body;
            if (!data) return next(ApiError.badRequest('Invalid request'));
            const summary = await createOrderService(req.body, req.user);
            return res.json(summary);
        } catch (error) {
            next(error);
        }
    };
};

export default new CreateOrderController();
