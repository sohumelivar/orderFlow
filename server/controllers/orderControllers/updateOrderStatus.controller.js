import { Order, PipePair } from '../../models/index.js';
import ApiError from '../../src/utils/ApiError.js';

class UpdateOrderStatusController {
    async updateOrderStatus (req, res, next) {
        try {
            const id = Number(req.params.id);
            const order = await Order.findByPk(id, {
                include: [
                    {
                        model: PipePair,
                        attributes: ['suction_size', 'liquid_size']
                    }
                ]
            });

            if (!order) return next(ApiError.badRequest('Invalid request'));
            if (order.status === 'completed') return next(ApiError.badRequest('Invalid request'));

            const newStatus = order.status === 'waiting' ? 'in_progress' : 'waiting';
            await order.update({status: newStatus});
            const response = {
                order: {
                    id: order.id,
                    suction_size: order.PipePair.suction_size,
                    liquid_size: order.PipePair.liquid_size,
                    length: Number(order.length),
                    quantity: order.quantity,
                    status: newStatus,
                    created_at: order.created_at,
                    comment: order.comment,
                    updated_at: order.updated_at,
                    completed_at: order.completed_at,
                }
            }
            return res.json(response); 
        } catch (error) {
            next(error);
        }
    }
};

export default new UpdateOrderStatusController();
