import { describe, it, expect, jest, beforeEach } from '@jest/globals';

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
    getActiveOrdersService,
} = await import('../../../../services/orders/orders.service.js');

const {
    getActiveOrders,
} = await import('../../../../services/orders/orders.queries.js');

describe('getActiveOrdersService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return formatted active orders array', async () => {
        getActiveOrders.mockResolvedValue([
            {
                id: 1,
                length: 10,
                quantity: 2,
                status: 'waiting',
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
        const result = await getActiveOrdersService();
        expect(getActiveOrders).toHaveBeenCalledTimes(1);
        expect(result).toEqual({
            orders: [
                {
                    id: 1,
                    suction_size: '3/4',
                    liquid_size: '3/8',
                    length: 10,
                    quantity: 2,
                    status: 'waiting',
                    created_at: '2026-03-20T10:00:00.000Z',
                    comment: 'test comment',
                    updated_at: '2026-03-20T10:00:00.000Z',
                    completed_at: null,
                },
            ],
        });
    });

    it('should return empty array if no active orders', async () => {
        getActiveOrders.mockResolvedValue([]);
        const result = await getActiveOrdersService();
        expect(getActiveOrders).toHaveBeenCalledTimes(1);
        expect(result).toEqual({orders: []});
    });

    it('should not include comment field if comment is missing', async () => {
        getActiveOrders.mockResolvedValue([
            {
                id: 1,
                length: 10,
                quantity: 2,
                status: 'waiting',
                created_at: '2026-03-20T10:00:00.000Z',
                updated_at: '2026-03-20T10:00:00.000Z',
                completed_at: null,
                    PipePair: {
                        suction_size: '3/4',
                        liquid_size: '3/8',
                    },
            },
        ]);
        const result = await getActiveOrdersService();
        expect(result.orders[0]).not.toHaveProperty('comment');
    });
});
