import ApiError from '../../utils/ApiError.js';
import ERRORS from '../../constants/errors.js';
import { VALID_PIPE_SIZES } from '../../constants/order.constants.js';
import { VALID_ROLES } from '../../constants/auth.constants.js';

export function ensureObject(data) {
    if (typeof data !== 'object' || data === null || Array.isArray(data)) throw ApiError.badRequest(ERRORS.INVALID_REQUEST);
};

function ensureCreateOrderFields(data) {
    if (!data.suction_size || typeof data.suction_size !== 'string') throw ApiError.badRequest(ERRORS.INVALID_SUCTION_SIZE);
    if (!VALID_PIPE_SIZES.has(data.suction_size)) throw ApiError.badRequest(ERRORS.INVALID_SUCTION_SIZE);
    if (!data.liquid_size || typeof data.liquid_size !== 'string') throw ApiError.badRequest(ERRORS.INVALID_LIQUID_SIZE);
    if (!VALID_PIPE_SIZES.has(data.liquid_size)) throw ApiError.badRequest(ERRORS.INVALID_LIQUID_SIZE);
    if (!data.length || typeof data.length !== 'number' || data.length <= 0) throw ApiError.badRequest(ERRORS.INVALID_LENGTH);
    if (!data.quantity || typeof data.quantity !== 'number' || data.quantity <= 0) throw ApiError.badRequest(ERRORS.INVALID_QUANTITY);
    if (!data.price_per_meter || typeof data.price_per_meter !== 'number' || data.price_per_meter <= 0) throw ApiError.badRequest(ERRORS.INVALID_PRICE);
    if (data.comment) {
        if (typeof data.comment !== 'string') throw ApiError.badRequest(ERRORS.INVALID_COMMENT);
    };
};

function ensureUpdateOrderFields(data) {
    if (!data.id || !Number.isInteger(data.id) || data.id <= 0) throw ApiError.badRequest(ERRORS.INVALID_ORDER_ID);
    if (!data.suction_size || typeof data.suction_size !== 'string') throw ApiError.badRequest(ERRORS.INVALID_SUCTION_SIZE);
    if (!VALID_PIPE_SIZES.has(data.suction_size)) throw ApiError.badRequest(ERRORS.INVALID_SUCTION_SIZE);
    if (!data.liquid_size || typeof data.liquid_size !== 'string') throw ApiError.badRequest(ERRORS.INVALID_LIQUID_SIZE);
    if (!VALID_PIPE_SIZES.has(data.liquid_size)) throw ApiError.badRequest(ERRORS.INVALID_LIQUID_SIZE);
    if (!data.length || typeof data.length !== 'number' || data.length <= 0) throw ApiError.badRequest(ERRORS.INVALID_LENGTH);
    if (!data.quantity || typeof data.quantity !== 'number' || data.quantity <= 0) throw ApiError.badRequest(ERRORS.INVALID_QUANTITY);
    if (data.comment) {
        if (typeof data.comment !== 'string') throw ApiError.badRequest(ERRORS.INVALID_COMMENT);
    };
};

function ensureUser(user) {
    if (!user.uid || !Number.isInteger(user.uid) || user.uid <= 0) throw ApiError.badRequest(ERRORS.INVALID_USER_ID);
    if (typeof user.telegramId !== 'string' || !/^\d+$/.test(user.telegramId)) throw ApiError.badRequest(ERRORS.INVALID_TELEGRAM_ID);
    if (!VALID_ROLES.has(user.role)) throw ApiError.badRequest(ERRORS.INVALID_ROLE);
};

function ensureCompleteOrderObject(data) {
    if (!data.id || !Number.isInteger(data.id) || data.id <= 0) throw ApiError.badRequest(ERRORS.INVALID_ORDER_ID);
    if(!data.completed_quantity || typeof data.completed_quantity !== 'number' || data.completed_quantity <= 0) throw ApiError.badRequest(ERRORS.INVALID_COMPLETED_QUANTITY);
};

function ensureId(id) {
    if (!id || !Number.isInteger(id)) throw ApiError.badRequest(ERRORS.INVALID_ORDER_ID);
};



export const orderValidator = {
    create(data, user) {
        ensureObject(data);
        ensureObject(user);
        ensureUser(user);
        ensureCreateOrderFields(data);
    },

    complete(data, user) {
        ensureObject(data);
        ensureObject(user);
        ensureUser(user);
        ensureCompleteOrderObject(data);
    },

    update(data) {
        ensureUpdateOrderFields(data);
    },

    delete(id) {
        ensureId(id);
    },

    updateStatus(id) {
        ensureId(id);
    },
};
