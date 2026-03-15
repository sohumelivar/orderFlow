import { 
    getPipePair,
    createNewOrder,
    getOrderById,
    createNewOrderAfterComplete,
    destroyOrder,
    getActiveOrders,
    getCompletedOrders,
    updatedOrder
} from "./orders.queries.js";
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

function buildOrdersArray (activeOrders) {
    const data = activeOrders.map((e) => (
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
    return {orders: data};
};

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
};

export async function deleteOrder (id) {
    const order = await getOrderById(id);
    if (!order || order.status === 'in_progress') throw ApiError.badRequest('Invalid request');
    return await destroyOrder(id);
};

export async function getActiveOrdersService () {
    const activeOrders = await getActiveOrders();
    return buildOrdersArray(activeOrders);
};

export async function getCompletedOrdersService() {
    const completedOrders = await getCompletedOrders();
    return buildOrdersArray(completedOrders);
};

export async function updateOrderService(data) {
    if (!data.id) throw ApiError.badRequest('Invalid request');
    const pipePair = await getPipePair(data.suction_size, data.liquid_size);
    if (!pipePair) throw ApiError.badRequest('Invalid request');
    const updateOrder = {
        pipe_pair_id: pipePair.id,
        length: data.length,
        quantity: data.quantity,
        comment: data?.comment,
    };
    await updatedOrder(updateOrder, data.id);
    const order = await getOrderById(data.id);
    return buildSummary(order);
};
