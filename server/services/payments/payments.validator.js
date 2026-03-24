import ApiError from '../../utils/ApiError.js';
import ERRORS from '../../constants/errors.js';

function ensureAmount (amount) {
    if (!amount || !Number.isInteger(amount) || amount <= 0) throw ApiError.badRequest(ERRORS.INVALID_AMOUNT);
};

function ensureUser(user) {
    if (!user.uid || !Number.isInteger(user.uid) || user.uid <= 0) throw ApiError.badRequest(ERRORS.INVALID_USER_ID);
    if (typeof user.telegramId !== 'string' || !/^\d+$/.test(user.telegramId)) throw ApiError.badRequest(ERRORS.INVALID_TELEGRAM_ID);
    if (!VALID_ROLES.has(user.role)) throw ApiError.badRequest(ERRORS.INVALID_ROLE);
};

export const paymentsValidator = {
    pay(user, amount ) {
        ensureUser(user),
        ensureAmount(amount)
    },

    completePayment(user, id) {
        ensureUser(user),
        ensureAmount(amount)
    },

    rejectPayment(user, id) {
        ensureAmount(id);
        ensureUser(user),

    },
};