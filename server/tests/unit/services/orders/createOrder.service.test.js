import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import ERRORS from '../../../../constants/errors.js';

jest.unstable_mockModule('../../../../services/orders/orders.queries.js', () => ({
    getPipePair: jest.fn(),
    createNewOrder: jest.fn(),
    getOrderById: jest.fn(),
    createNewOrderAfterComplete: jest.fn(),
    destroyOrder: jest.fn(),
    getActiveOrders: jest.fn(),
    getCompletedOrders: jest.fn(),
    updatedOrder: jest.fn(),
    updateOrderStatus: jest.fn(),
}));

jest.unstable_mockModule('../../../../services/orders/order.validator.js', () => ({
    orderValidator: {
        create: jest.fn(),
    },
}));

const {
    createOrderService,
} = await import('../../../../services/orders/orders.service.js');

const {
    getPipePair,
    createNewOrder,
} = await import('../../../../services/orders/orders.queries.js');

const {
    orderValidator,
} = await import('../../../../services/orders/order.validator.js');

describe('createOrderService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw error if pipe pair is not found', async () => {
        const order = {
            suction_size: '3/4',
            liquid_size: '3/8',
            length: 10,
            quantity: 2,
            price_per_meter: 5,
            comment: 'test comment',
        };
        const user = {
            uid: 1,
            telegramId: '123456789',
            role: 'owner',
        };
        getPipePair.mockResolvedValue(null);
        await expect(createOrderService(order, user)).rejects.toThrow(ERRORS.INVALID_PIPE_PAIR);
        expect(orderValidator.create).toHaveBeenCalledTimes(1);
        expect(orderValidator.create).toHaveBeenCalledWith(order, user);
        expect(getPipePair).toHaveBeenCalledTimes(1);
        expect(getPipePair).toHaveBeenCalledWith(order.suction_size, order.liquid_size);
        expect(createNewOrder).not.toHaveBeenCalled();
    });

    it('should create order and return formatted summary', async () => {
        const order = {
            suction_size: '3/4',
            liquid_size: '3/8',
            length: '10.00',
            quantity: 2,
            price_per_meter: 5,
            comment: 'test comment',
        };
        const user = {
            uid: 1,
            telegramId: '123456789',
            role: 'owner',
        };
        getPipePair.mockResolvedValue({ id: 7 });
        createNewOrder.mockResolvedValue({
            id: 1,
            length: 10,
            quantity: 2,
            status: 'waiting',
            created_at: '2026-03-24T10:00:00.000Z',
            updated_at: '2026-03-24T10:00:00.000Z',
            completed_at: null,
            comment: 'test comment',
            PipePair: {
                suction_size: '3/4',
                liquid_size: '3/8',
            },
        });
        const result = await createOrderService(order, user);
        expect(orderValidator.create).toHaveBeenCalledTimes(1);
        expect(orderValidator.create).toHaveBeenCalledWith(order, user);
        expect(getPipePair).toHaveBeenCalledTimes(1);
        expect(getPipePair).toHaveBeenCalledWith(order.suction_size, order.liquid_size);
        expect(createNewOrder).toHaveBeenCalledTimes(1);
        expect(createNewOrder).toHaveBeenCalledWith(order, user.uid, 7);
        expect(result).toEqual({
            order: {
                id: 1,
                suction_size: '3/4',
                liquid_size: '3/8',
                length: 10,
                quantity: 2,
                status: 'waiting',
                created_at: '2026-03-24T10:00:00.000Z',
                updated_at: '2026-03-24T10:00:00.000Z',
                completed_at: null,
                comment: 'test comment',
            },
        });
    });
});