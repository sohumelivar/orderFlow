import { getPipePair, createNewOrder, getOrderById, createNewOrderAfterComplete } from "./orders.queries.js";
import ApiError from "../../src/utils/ApiError.js";

function buildSummary(newOrder) {
    return {
        order: {
            id: newOrder.id,
            suction_size: String(newOrder.PipePair.suction_size),
            liquid_size: String(newOrder.PipePair.liquid_size),
            length: Number(newOrder.length),
            quantity: newOrder.quantity,
            status: newOrder.status,
            created_at: newOrder.created_at,
            updated_at: newOrder.updated_at,
            completed_at: newOrder.completed_at,
            ...(newOrder.comment && { comment: newOrder.comment }),
        }
    }
}

export async function createOrderService (data, user) {
    if (!data.suction_size || !data.liquid_size || !data.length || !data.quantity || !data.price_per_meter || !user.uid) throw ApiError.badRequest('Invalid request');

    const pipePair = await getPipePair(data.suction_size, data.liquid_size);

    if (!pipePair) throw ApiError.badRequest('Invalid request');

    const newOrder = await createNewOrder(data, user.uid, pipePair.id);
    return buildSummary(newOrder);
};

export async function completeOrder (data, userId) {
    const { id, completed_quantity } = data;
    const order = await getOrderById (id);

    if (!order || order.status === 'completed' || completed_quantity > order.quantity || completed_quantity < 0) throw ApiError.badRequest('Invalid request ---');
    if (completed_quantity === order.quantity) {
        await order.update({
            status: 'completed',
            manufacturer_id: userId,
            completed_at: new Date(),
        });
        return buildSummary(order);;
    };
    await createNewOrderAfterComplete(order, completed_quantity, userId);
    await order.update({
        status: 'waiting',
        quantity: order.quantity - completed_quantity
    });
    
    return buildSummary(order);;;
}
