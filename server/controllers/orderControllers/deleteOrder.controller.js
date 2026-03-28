import { deleteOrder } from '../../services/orders/orders.service.js';

class DeleteOrderController {
    async deleteOrder (req, res, next) {
        try {
            const deletedOrder = await deleteOrder(Number(req.params.id));
            return res.json(deletedOrder);
        } catch (error) {
            next(error);
        }
    };
};

export default new DeleteOrderController();
