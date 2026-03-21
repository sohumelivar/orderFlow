import { 
    getPipePair,
    createNewOrder,
    getOrderById,
    createNewOrderAfterComplete,
    destroyOrder,
    getActiveOrders,
    getCompletedOrders,
    updatedOrder,
    updateOrderStatus
} from "./orders.queries.js";
import ApiError from "../../utils/ApiError.js";
import { orderValidator } from "./order.validator.js";
import ERRORS from "../../constants/errors.js";
import { ORDER_STATUS } from "../../constants/order.constants.js";

function buildSummary(newOrder) {
    return {
        order: {
            id: Number(newOrder.id),
            suction_size: String(newOrder.PipePair.suction_size),
            liquid_size: String(newOrder.PipePair.liquid_size),
            length: Number(newOrder.length),
            quantity: Number(newOrder.quantity),
            status: String(newOrder.status),
            created_at: newOrder.created_at,
            updated_at: newOrder.updated_at,
            completed_at: newOrder.completed_at,
            ...(newOrder.comment && { comment: String(newOrder.comment) }),
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
            quantity: Number(e.quantity),
            status: e.status,
            created_at: e.created_at,
            ...(e.comment && {comment: e?.comment}),
            updated_at: e.updated_at,
            completed_at: e.completed_at
        }
    ));
    return {orders: data};
};

export async function createOrderService (order, user) {
    orderValidator.create(order, user);
    const pipePair = await getPipePair(order.suction_size, order.liquid_size);
    if (!pipePair) throw ApiError.badRequest(ERRORS.INVALID_PIPE_PAIR);
    const newOrder = await createNewOrder(order, user.uid, pipePair.id);
    return buildSummary(newOrder);
};

export async function completeOrder (data, user) {
    orderValidator.complete(data, user);    
    const { id, completed_quantity } = data;
    const order = await getOrderById (id);
    if (!order || order.status === ORDER_STATUS.COMPLETED) throw ApiError.badRequest(ERRORS.INVALID_REQUEST);
    if (completed_quantity > order.quantity) throw ApiError.badRequest(ERRORS.INVALID_QUANTITY);
    if (completed_quantity === order.quantity) {
        await order.update({
            status: ORDER_STATUS.COMPLETED,
            manufacturer_id: user.uid,
            completed_at: new Date(),
        });
        return buildSummary(order);;
    };
    await createNewOrderAfterComplete(order, completed_quantity, user.uid);
    await order.update({
        status: ORDER_STATUS.WAITING,
        quantity: order.quantity - completed_quantity
    });
    return buildSummary(order);
};

export async function deleteOrder (id) {
    orderValidator.delete(id);
    const order = await getOrderById(id);
    if (!order || order.status === ORDER_STATUS.IN_PROGRESS) throw ApiError.badRequest(ERRORS.INVALID_REQUEST);
    await destroyOrder(id);
    return {success: true, id};
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
    orderValidator.update(data);
    const pipePair = await getPipePair(data.suction_size, data.liquid_size);
    if (!pipePair) throw ApiError.badRequest(ERRORS.INVALID_PIPE_PAIR);
    const updateOrder = {
        pipe_pair_id: pipePair.id,
        length: data.length,
        quantity: data.quantity,
        comment: data?.comment,
    };
    const updated = await updatedOrder(updateOrder, data.id);
    if (updated[0] === 0) throw ApiError.badRequest(ERRORS.ORDER_NOT_FOUND);
    const order = await getOrderById(data.id);
    return buildSummary(order);
};

export async function updateOrderStatusService (id) {
    orderValidator.updateStatus(id);
    const order = await getOrderById(id);
    if (!order || order.status === ORDER_STATUS.COMPLETED) throw ApiError.badRequest(ERRORS.ORDER_NOT_FOUND);
    const newStatus = order.status === ORDER_STATUS.WAITING ? ORDER_STATUS.IN_PROGRESS : ORDER_STATUS.WAITING;
    const updatedOrder = await updateOrderStatus(id, newStatus);
    return buildSummary(updatedOrder);
};
