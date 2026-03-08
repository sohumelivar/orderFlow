import { Order, Payment } from '../../models/index.js';
import { Op } from 'sequelize';

export async function getCompletedOrdersByRange(start, end) {
    return Order.findAll({
        where: {
        status: 'completed',
        created_at: {
            [Op.gte]: start,
            [Op.lt]: end,
        },
        },
    });
}

export async function getAcceptedPaymentsByRange(start, end) {
    return Payment.findAll({
        where: {
        status: 'accepted',
        created_at: {
            [Op.gte]: start,
            [Op.lt]: end,
        },
        },
    });
}

export async function getPendingPaymentsByRange(start, end) {
    return Payment.findAll({
        where: {
        status: 'pending',
        created_at: {
            [Op.gte]: start,
            [Op.lt]: end,
        },
        },
    });
}

export async function getAllCompletedOrders() {
    return Order.findAll({
        where: {
        status: 'completed',
        },
    });
}

export async function getAllAcceptedPayments() {
    return Payment.findAll({
        where: {
        status: 'accepted',
        },
    });
}

export async function getAllPendingPayments() {
    return Payment.findAll({
        where: {
        status: 'pending',
        },
    });
}