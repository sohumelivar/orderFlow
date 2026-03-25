import ERRORS from "../../constants/errors.js";
import { PAYMENT_STATUS } from "../../constants/payment.constants.js";
import { Payment } from "../../models/Payment.js";
import ApiError from "../../utils/ApiError.js";
import { acceptPayment, createPayment, getPaymentById, rejectPayment } from "./payments.queries.js";
import { paymentsValidator } from "./payments.validator.js";

function buildPayment (payment) {
    return {
        payment: payment
    }
}

export async function payOrderService(amount, user) {
    paymentsValidator.pay(user, amount);
    if (user.role !== 'owner' ) throw ApiError.badRequest(ERRORS.INVALID_ROLE);
    const createdPayment = await createPayment(amount, user);
    return buildPayment(createdPayment);
};

export async function completePaymentService(id, user) {
    paymentsValidator.complete(user, id);
    if (user.role !== 'manufacturer') throw ApiError.badRequest(ERRORS.INVALID_ROLE);
    const payment = await getPaymentById(id);
    if (!payment || payment.status !== PAYMENT_STATUS.PENDING) throw ApiError.badRequest(ERRORS.PAYMENT_FAILED);
    const acceptedPayment = await acceptPayment(payment);
    return buildPayment(acceptedPayment);
};

export async function rejectPaymentService(id, user) {
    paymentsValidator.rejectPayment(user, id);
    if (user.role !== 'manufacturer') throw ApiError.badRequest('Invalid request');
    const payment = await getPaymentById(id);
    if (!payment || payment.status !== PAYMENT_STATUS.PENDING) throw ApiError.badRequest(ERRORS.PAYMENT_FAILED);
    const rejectedPayment = await rejectPayment(payment);
    return buildPayment(rejectedPayment);
};
