import { getActiveOrdersService } from '../../services/orders/orders.service.js';

class GetActiveOrdersController {
    async getActiveOrders (req, res, next) {
        try {
            const activeOrders = await getActiveOrdersService();
            return res.json(activeOrders);
        } catch (error) {
            next(error);
        }
    };
};

export default new GetActiveOrdersController();