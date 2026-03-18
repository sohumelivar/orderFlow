import ApiError from "../../src/utils/ApiError.js";
import { acceptPayment, createPayment, rejectPayment } from "./payments.queries.js";

export async function payOrderService(amount, user) {
    if (user.role !== 'owner' ) throw ApiError.badRequest('Invalid request');
    return await createPayment(amount, user);
};

export async function completePaymentService(id, user) {
    if (user.role !== 'manufacturer') throw ApiError.badRequest('Invalid role');
    return acceptPayment(id)
};

export async function rejectPaymentService(id, user) {
    if (user.role !== 'manufacturer') throw ApiError.badRequest('Invalid request');
    const rejectedPayment = await rejectPayment(id);
    return rejectedPayment;
};
