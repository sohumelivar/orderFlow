import { getActiveOrdersService } from '../../services/orders/orders.service.js';

class GetActiveOrdersController {
    async getActiveOrders (req, res, next) {
        try {
            const activeOrders = await getActiveOrdersService();
            console.log('active orders: ', activeOrders);
            
            return res.json(activeOrders);
        } catch (error) {
            next(error);
        }
    };
};

export default new GetActiveOrdersController();