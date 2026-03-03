import { Order, PipePair } from '../../models/index.js';
import ApiError from '../../src/utils/ApiError.js';

class CreateOrderController {
    async createOrder (req, res, next) {
        try {
            const data = req.body;
            if (!data) return next(ApiError.badRequest('Invalid request'));
            const pipe_pair = await PipePair.findOne({
                where: {
                    suction_size: data.suction_size,
                    liquid_size: data.liquid_size,
                }
            });

            if (!pipe_pair) return next(ApiError.badRequest('Invalid request'));

            const newOrder = {
                pipe_pair_id: pipe_pair.id,
                owner_id: req.user.uid,
                length: data.length,
                quantity: data.quantity,
                price_per_meter: data.price_per_meter,
                ...(data.comment && { comment: data.comment })
            };
            const newOrderBd = await Order.create(newOrder);
            const orderBd = await Order.findByPk(newOrderBd.id, {
                include: [
                    {
                        model: PipePair
                    }
                ]
            })
            
            return res.json({
                order: {
                    id: orderBd.id,
                    suction_size: String(orderBd.PipePair.suction_size),
                    liquid_size: String(orderBd.PipePair.liquid_size),
                    length: Number(orderBd.length),
                    quantity: orderBd.quantity,
                    status: orderBd.status,
                    created_at: orderBd.created_at,
                    updated_at: orderBd.updated_at,
                    completed_at: orderBd.completed_at,
                    ...(orderBd.comment && { comment: orderBd.comment }),
                }
            });
        } catch (error) {
            next(error);
        }
    };
};

export default new CreateOrderController();
