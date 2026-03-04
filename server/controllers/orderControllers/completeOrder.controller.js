import { Order, PipePair } from '../../models/index.js';
import ApiError from '../../src/utils/ApiError.js';

class CompleteOrderController {
    async completeOrder (req, res, next) {
        try {
            const { id, completed_quantity } = req.body;
            const manufacturer = req.user.uid;
            const order = await Order.findByPk(id, {
                include: [
                    {
                        model: PipePair,
                        attributes: ['id', 'suction_size', 'liquid_size', 'display_name'],
                    }
                ]
            });
            
            
            if (!order || order.status === 'completed' || completed_quantity > order.quantity || completed_quantity < 0) return next(ApiError.badRequest('Invalid request'));

            if (completed_quantity === order.quantity) {
                await order.update({
                    status: 'completed',
                    manufacturer_id: manufacturer,
                    completed_at: new Date(),
                });
                return res.json({completed: true});
            };

                await Order.create({
                    pipe_pair_id: order.pipe_pair_id,
                    owner_id: order.owner_id,
                    manufacturer_id: manufacturer,
                    length: Number(order.length),
                    quantity: Number(completed_quantity),
                    price_per_meter: Number(order.price_per_meter),
                    status: 'completed',
                    completed_at: new Date(),
                    ...(order.comment && {comment: order.comment})
                });
                
                await order.update({
                    status: 'in_progress',
                    quantity: order.quantity - completed_quantity
                });
        
            return res.json({order:{
                id: order.id,
                suction_size: String(order.PipePair.suction_size),
                liquid_size: String(order.PipePair.liquid_size),
                length: Number(order.length),
                quantity: order.quantity,
                status: order.status,
                created_at: order.created_at,
                updated_at: order.updated_at,
                completed_at: order.completed_at,
                ...(order.comment && { comment: order.comment }),
            }});          
        } catch (error) {
            next(error);
        }
    }
};

export default new CompleteOrderController();