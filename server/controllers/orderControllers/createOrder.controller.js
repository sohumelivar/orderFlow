import { createOrderService } from '../../services/orders/orders.service.js';

class CreateOrderController {
    async createOrder (req, res, next) {
        try {
            const newOrder = await createOrderService(req.body, req.user);
            return res.json(newOrder);
        } catch (error) {
            next(error);
        }
    };
};

export default new CreateOrderController();
