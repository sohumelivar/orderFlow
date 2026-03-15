import { deleteOrder } from '../../services/orders/orders.service.js';

class DeleteOrderController {
    async deleteOrder (req, res, next) {
        try {
            const id = Number(req.params.id);
            await deleteOrder(id);
            return res.json({
                success: true,
                id
            });
        } catch (error) {
            next(error);
        }
    }
};

export default new DeleteOrderController();
