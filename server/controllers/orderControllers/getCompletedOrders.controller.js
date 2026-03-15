import { Order, PipePair } from '../../models/index.js';
import { getCompletedOrdersService } from '../../services/orders/orders.service.js';

class GetCompletedOrdersController {
    async getCompletedOrders (req, res, next) {
        try {
            const completedOrders = await getCompletedOrdersService();
            return res.json(completedOrders);
        } catch (error) {
            next(error);
        }
    }
};

export default new GetCompletedOrdersController();