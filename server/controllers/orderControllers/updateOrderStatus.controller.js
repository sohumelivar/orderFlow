import { Order, PipePair } from '../../models/index.js';

class UpdateOrderStatusController {
    async updateOrderStatus (req, res, next) {
        try {
            const data = req.body;
            await Order.update({
                status: data.status
            },{
                where: {id: data.id}
            })
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
            }
            res.json(response); 
        } catch (error) {
            next(error);
        }
    }
};

export default new UpdateOrderStatusController();
