import {
    getCompletedOrdersByRange,
    getAcceptedPaymentsByRange,
    getPendingPaymentsByRange,
    getAllCompletedOrders,
    getAllAcceptedPayments,
    getAllPendingPayments
} from './stats.queries.js';
import {
    getLastMonthRange,
    getLastWeekRange
} from './stats.ranges.js';


function buildSummary(completedOrders, acceptedPayments, pendingPayments) {
    const total_completed = completedOrders.reduce((sum, order) => {
        return sum + (
            Number(order.length) *
            Number(order.quantity) *
            Number(order.price_per_meter)
        );
    }, 0);

    const total_paid = acceptedPayments.reduce((sum, payment) => {
        return sum + Number(payment.amount);
    }, 0);

    const pendingPaymentsTotal = pendingPayments.reduce((sum, payment) => {
        return sum + Number(payment.amount);
    }, 0);

    const outstanding_debt = total_completed - total_paid;

    return {
        total_completed,
        total_paid,
        outstanding_debt,
        pendingPaymentsTotal,
    };
};

export async function buildLastMonthStats() {
    const { start, end } = getLastMonthRange();

    const [completedOrders, acceptedPayments, pendingPayments] = await Promise.all([
        getCompletedOrdersByRange(start, end),
        getAcceptedPaymentsByRange(start, end),
        getPendingPaymentsByRange(start, end),
    ]);

    return buildSummary(completedOrders, acceptedPayments, pendingPayments);
};

export async function buildLastWeekStats() {
    const { start, end } = getLastWeekRange();

    const [completedOrders, acceptedPayments, pendingPayments] = await Promise.all([
        getCompletedOrdersByRange(start, end),
        getAcceptedPaymentsByRange(start, end),
        getPendingPaymentsByRange(start, end),
    ]);

    return buildSummary(completedOrders, acceptedPayments, pendingPayments);
};

export async function buildAllTimeStats() {
    const [completedOrders, acceptedPayments, pendingPayments] = await Promise.all([
        getAllCompletedOrders(),
        getAllAcceptedPayments(),
        getAllPendingPayments(),
    ]);

    return buildSummary(completedOrders, acceptedPayments, pendingPayments);
};