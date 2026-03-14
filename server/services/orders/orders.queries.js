import { PipePair, Order } from "../../models/index.js";

export async function getPipePair(suction_size, liquid_size) {
    return PipePair.findOne({
        where: {
            suction_size,
            liquid_size,
        }
    });
};

export async function createNewOrder(data, userId, pipePairId) {
    const newOrderBd = await Order.create({
        pipe_pair_id: pipePairId,
        owner_id: userId,
        length: data.length,
        quantity: data.quantity,
        price_per_meter: data.price_per_meter,
        ...(data.comment && { comment: data.comment })
    });

    return Order.findByPk(newOrderBd.id, {
        include: [
            {
                model: PipePair
            }
        ]
    });
};

export async function getOrderById (id) {
    return Order.findByPk(id, {
        include: [
            {
                model: PipePair,
                attributes: ['id', 'suction_size', 'liquid_size', 'display_name'],
            }
        ]
    });
};

export async function createNewOrderAfterComplete(order, completedQuantity, userId) {
    
    Order.create({
        pipe_pair_id: order.pipe_pair_id,
        owner_id: order.owner_id,
        manufacturer_id: userId,
        length: Number(order.length),
        quantity: Number(completedQuantity),
        price_per_meter: Number(order.price_per_meter),
        status: 'completed',
        completed_at: new Date(),
        ...(order.comment && {comment: order.comment})
    });
}