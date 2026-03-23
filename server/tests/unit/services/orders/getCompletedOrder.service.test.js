import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { ORDER_STATUS } from '../../../../constants/order.constants.js';

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

const {
    getCompletedOrdersService,
} = await import('../../../../services/orders/orders.service.js');

const {
    getCompletedOrders,
} = await import('../../../../services/orders/orders.queries.js');

describe('getCompletedOrdersService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return formatted completed orders array', async () => {
        getCompletedOrders.mockResolvedValue([
            {
                id: 1,
                length: 10,
                quantity: 2,
                status: ORDER_STATUS.COMPLETED,
                created_at: '2026-03-20T10:00:00.000Z',
                updated_at: '2026-03-20T10:00:00.000Z',
                completed_at: null,
                comment: 'test comment',
                PipePair: {
                    suction_size: '3/4',
                    liquid_size: '3/8',
                },
            },
        ]);
        const result = await getCompletedOrdersService();
        expect(getCompletedOrders).toHaveBeenCalledTimes(1);
        expect(result).toEqual({
            orders: [
                {
                    id: 1,
                    suction_size: '3/4',
                    liquid_size: '3/8',
                    length: 10,
                    quantity: 2,
                    status: ORDER_STATUS.COMPLETED,
                    created_at: '2026-03-20T10:00:00.000Z',
                    comment: 'test comment',
                    updated_at: '2026-03-20T10:00:00.000Z',
                    completed_at: null,
                },
            ],
        });
    });

    it('should return empty array if no completed orders', async () => {
        getCompletedOrders.mockResolvedValue([]);
        const result = await getCompletedOrdersService();
        expect(getCompletedOrders).toHaveBeenCalledTimes(1);
        expect(result).toEqual({orders: []});
    });

    it('should not include comment field if comment is missing', async () => {
        getCompletedOrders.mockResolvedValue([
            {
                id: 1,
                length: 10,
                quantity: 2,
                status: ORDER_STATUS.COMPLETED,
                created_at: '2026-03-20T10:00:00.000Z',
                updated_at: '2026-03-20T10:00:00.000Z',
                completed_at: null,
                PipePair: {
                    suction_size: '3/4',
                    liquid_size: '3/8',
                },
            },
        ]);
        const result = await getCompletedOrdersService();
        expect(result.orders[0]).not.toHaveProperty('comment');
    });
});
