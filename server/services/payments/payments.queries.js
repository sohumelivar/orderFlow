import { Payment } from "../../models/index.js";
import ApiError from "../../utils/ApiError.js";

export async function createPayment(amount, user) {
    return Payment.create({
        owner_id: user.uid,
        amount: Number(amount),
        created_at: new Date(),
    })
};

export async function acceptPayment(id) {
    const payment = await Payment.findByPk(Number(id));
    await payment.update({status: 'accepted'});
    return payment;
};

export async function rejectPayment(id) {
    const payment = await Payment.findByPk(id);
    if (payment.status !== 'pending') throw ApiError.badRequest('Invalid status');
    return payment.update({status: 'rejected'});
};
