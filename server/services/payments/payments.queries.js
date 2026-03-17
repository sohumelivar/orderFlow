import { Payment } from "../../models/index.js";

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
