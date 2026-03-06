import { Order } from '../../models/index.js';

class DeleteOrderController {
    async deleteOrder (req, res, next) {
        try {
            const id = Number(req.params.id);
            await Order.destroy({
                where: { id }
            })
            res.json({
                delete: true,
                id
            });
        } catch (error) {
            next(error);
        }
    }
};

export default new DeleteOrderController();
