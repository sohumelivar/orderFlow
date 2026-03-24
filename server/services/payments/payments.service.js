import ApiError from "../../utils/ApiError.js";
import { acceptPayment, createPayment, rejectPayment } from "./payments.queries.js";

export async function payOrderService(amount, user) {
    if (user.role !== 'owner' ) throw ApiError.badRequest('Invalid request 1');
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

function ensureId(id) {
    if (!id || !Number.isInteger(id)) throw ApiError.badRequest(ERRORS.INVALID_ORDER_ID);
};
