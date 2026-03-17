import { updateOrderStatusService } from '../../services/orders/orders.service.js';

class UpdateOrderStatusController {
    async updateOrderStatus (req, res, next) {
        try {
            const id = Number(req.params.id);
            const updatedOrder = await updateOrderStatusService(id);
            return res.json(updatedOrder); 
        } catch (error) {
            next(error);
        }
    }
};

export default new UpdateOrderStatusController();
