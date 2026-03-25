import ApiError from '../../utils/ApiError.js';
import ERRORS from '../../constants/errors.js';
import { VALID_ROLES } from '../../constants/auth.constants.js';

function ensureAmount (amount) {
    if (!amount || !Number.isInteger(amount) || amount <= 0) throw ApiError.badRequest(ERRORS.INVALID_AMOUNT);
};

function ensureUser(user) {
    if (!user.uid || !Number.isInteger(user.uid) || user.uid <= 0) throw ApiError.badRequest(ERRORS.INVALID_USER_ID);
    if (typeof user.telegramId !== 'string' || !/^\d+$/.test(user.telegramId)) throw ApiError.badRequest(ERRORS.INVALID_TELEGRAM_ID);
    if (!VALID_ROLES.has(user.role)) throw ApiError.badRequest(ERRORS.INVALID_ROLE);
};

function ensureId(id) {
    if (!id || typeof id !== 'string') throw ApiError.badRequest(ERRORS.INVALID_ORDER_ID);
};

export const paymentsValidator = {
    pay(user, amount ) {
        ensureUser(user),
        ensureAmount(amount)
    },

    complete(user, id) {
        ensureUser(user),
        ensureId(id)
    },

    rejectPayment(user, id) {
        ensureUser(user);
        ensureAmount(id);
    },
};