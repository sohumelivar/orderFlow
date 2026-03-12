import {
    getCompletedOrdersByRange,
    getAcceptedPaymentsByRange,
    getPendingPaymentsByRange,
    getAllPaymentsByRange,
    getAllCompletedOrders,
    getAllAcceptedPayments,
    getAllPendingPayments,
    getAllPayments,
} from './stats.queries.js';
import {
    getLastMonthRange,
    getLastWeekRange,
    buildCustomMonthRange,
} from './stats.ranges.js';


function buildSummary(completedOrders, acceptedPayments, pendingPaymentsData, payments) {
    const pendingPayments = pendingPaymentsData.map(p => ({
        date: p.created_at,
        amount: Number(p.amount),
        status: p.status,
    }));
    
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

    const pendingPaymentsTotal = pendingPaymentsData.reduce((sum, payment) => {
        return sum + Number(payment.amount);
    }, 0);

    const outstanding_debt = total_completed - total_paid;

    const orders = {};

    let total_quantity = 0;
    let total_meter = 0;
    let total_amount = 0;

    for (const order of completedOrders) {
        const name = order.PipePair.display_name;

        if (!orders[name]) {
            orders[name] = {
            display_name: name,
            quantity: 0,
            total_meter: 0,
            amount: 0
            };
        }

        const quantity = Number(order.quantity);
        const length = Number(order.length);
        const price = Number(order.price_per_meter);

        const meter = length * quantity;
        const amount = meter * price;

        orders[name].quantity += quantity;
        orders[name].total_meter += meter;
        orders[name].amount += amount;

        total_quantity += quantity;
        total_meter += meter;
        total_amount += amount;
    }

    const pipe_type_statistics = {
        orders: Object.values(orders),
        total: {
            quantity: total_quantity,
            meter: total_meter,
            amount: total_amount
        }
    };

    return {
        summary: {
            total_completed,
            total_paid,
            outstanding_debt,
            pendingPaymentsTotal,
            pendingPayments
        },
        pipe_type_statistics,
        payment_history: payments,
    };
};

export async function buildLastMonthStats() {
    const { start, end } = getLastMonthRange();

    const [completedOrders, acceptedPayments, pendingPaymentsData, payments] = await Promise.all([
        getCompletedOrdersByRange(start, end),
        getAcceptedPaymentsByRange(start, end),
        getPendingPaymentsByRange(start, end),
        getAllPaymentsByRange(start, end)
    ]);

    return buildSummary(completedOrders, acceptedPayments, pendingPaymentsData, payments);
};

export async function buildLastWeekStats() {
    const { start, end } = getLastWeekRange();

    const [completedOrders, acceptedPayments, pendingPayments, payments] = await Promise.all([
        getCompletedOrdersByRange(start, end),
        getAcceptedPaymentsByRange(start, end),
        getPendingPaymentsByRange(start, end),
        getAllPaymentsByRange(start, end)
    ]);

    return buildSummary(completedOrders, acceptedPayments, pendingPayments, payments);
};

export async function buildAllTimeStats() {
    const [completedOrders, acceptedPayments, pendingPayments, payments] = await Promise.all([
        getAllCompletedOrders(),
        getAllAcceptedPayments(),
        getAllPendingPayments(),
        getAllPayments()
    ]);

    return buildSummary(completedOrders, acceptedPayments, pendingPayments, payments);
};

export async function buildACustomMonthStats(month, year) {
    const { start, end } = buildCustomMonthRange(month, year);

    const [completedOrders, acceptedPayments, pendingPayments, payments] = await Promise.all([
        getCompletedOrdersByRange(start, end),
        getAcceptedPaymentsByRange(start, end),
        getPendingPaymentsByRange(start, end),
        getAllPaymentsByRange(start, end)
    ]);

    return buildSummary(completedOrders, acceptedPayments, pendingPayments, payments);
};
