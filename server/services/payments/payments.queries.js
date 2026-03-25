import { Payment } from "../../models/index.js";

export async function getPaymentById(id) {
    return Payment.findByPk(Number(id));
}

export async function createPayment(amount, user) {
    return Payment.create({
        owner_id: user.uid,
        amount: Number(amount),
        created_at: new Date(),
    })
};

export async function acceptPayment(payment) {
    await payment.update({status: 'accepted'});
    return payment;
};

export async function rejectPayment(payment) {
    return payment.update({status: 'rejected'});
};
