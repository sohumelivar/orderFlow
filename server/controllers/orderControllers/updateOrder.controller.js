import { Order, PipePair } from '../../models/index.js';
import ApiError from '../../src/utils/ApiError.js';

class UpdateOrderController {
    async updateOrder (req, res, next) {
        try {
            const data = req.body;
            const pipe_pair = await PipePair.findOne({
                where: {
                    suction_size: data.suction_size,
                    liquid_size: data.liquid_size,
                }
            });
            if (!pipe_pair) return next(ApiError.badRequest('Invalid request'));

            const updateOrder = {
                pipe_pair_id: pipe_pair.id,
                length: data.length,
                quantity: data.quantity,
                comment: data?.comment,
            }

            await Order.update(updateOrder, {
                where: { id: data.id },
            });

            const updatedOrder = await Order.findByPk(data.id, {
                include: [
                    {
                        model: PipePair,
                        attributes: ['suction_size', 'liquid_size']
                    }
                ]
            });

            const response = {
                order: {
                    id: data.id,
                    suction_size: updatedOrder.PipePair.suction_size,
                    liquid_size: updatedOrder.PipePair.liquid_size,
                    length: Number(updatedOrder.length),
                    quantity: updatedOrder.quantity,
                    status: updatedOrder.status,
                    created_at: updatedOrder.created_at,
                    comment: updatedOrder.comment,
                    updated_at: updatedOrder.updated_at,
                    completed_at: updatedOrder.completed_at,
                }
            };
            return res.json(response);
        } catch (error) {
            next(error);
        }
    }
};

export default new UpdateOrderController();