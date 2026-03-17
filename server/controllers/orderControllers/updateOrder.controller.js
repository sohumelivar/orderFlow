import { updateOrderService } from '../../services/orders/orders.service.js';
import ApiError from '../../src/utils/ApiError.js';

class UpdateOrderController {
    async updateOrder (req, res, next) {
        try {
            const data = req.body;
            if (!data) return next(ApiError.badRequest('Invalid request'));
            const updatedOrder = await updateOrderService(data);
            return res.json(updatedOrder);
        } catch (error) {
            next(error);
        }
    }
};

export default new UpdateOrderController();