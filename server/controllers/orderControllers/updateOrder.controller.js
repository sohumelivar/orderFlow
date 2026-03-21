import { updateOrderService } from '../../services/orders/orders.service.js';

class UpdateOrderController {
    async updateOrder (req, res, next) {
        try {
            const updatedOrder = await updateOrderService(req.body);
            return res.json(updatedOrder);
        } catch (error) {
            next(error);
        }
    }
};

export default new UpdateOrderController();