import { Order, PipePair } from '../../models/index.js';

class GetCompletedOrdersController {
    async getCompletedOrders (req, res, next) {
        try {
            const orders = await Order.findAll({
                where: { 
                    status: 'completed'
                },
                order: [['created_at', 'DESC']],
                include: [
                    {
                        model: PipePair,
                        attributes: ['id', 'suction_size', 'liquid_size', 'display_name']
                    }
                ]
            });
            const data = orders.map((e) => (
                    {
                        id: e.id,
                        suction_size: e.PipePair.suction_size,
                        liquid_size: e.PipePair.liquid_size,
                        length: Number(e.length),
                        quantity: e.quantity,
                        status: e.status,
                        created_at: e.created_at,
                        ...(e.comment && {comment: e?.comment}),
                        updated_at: e.updated_at,
                        completed_at: e.completed_at
                    }
            ));
            return res.json({orders: data});
        } catch (error) {
            next(error);
        }
    }
};

export default new GetCompletedOrdersController();