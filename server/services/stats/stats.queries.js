import { Order, Payment, PipePair } from '../../models/index.js';
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
        include: [
            {
                model: PipePair,
            }
        ]
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
        order: [['created_at', 'DESC']]
    });
}

export async function getAllPaymentsByRange(start, end) {
    const payments = await Payment.findAll({
        where: {
            created_at: {
                [Op.gte]: start,
                [Op.lt]: end,
            },
        },
        order: [['created_at', 'DESC']]
    });

    return payments.map(p => ({
        date: p.created_at,
        amount: Number(p.amount),
        status: p.status,
    }));
}

export async function getAllCompletedOrders() {
    return Order.findAll({
        where: {
            status: 'completed',
        },
        include: [
            {
                model: PipePair,
            }
        ]
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

export async function getAllPayments() {
    return Payment.findAll({
        order: [['created_at', 'DESC']]
    });

}
