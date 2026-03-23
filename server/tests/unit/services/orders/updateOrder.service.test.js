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

const { updateOrderService } = await import('../../../../services/orders/orders.service.js');
const { getPipePair, updatedOrder, getOrderById } = await import('../../../../services/orders/orders.queries.js');

describe('updateOrderService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw error if pipe pair is not found', async () => {
        const data = {
            id: 1,
            suction_size: '3/4',
            liquid_size: '1/2',
            length: 10,
            quantity: 2,
        };
        getPipePair.mockResolvedValue(null);
        await expect(updateOrderService(data)).rejects.toMatchObject({
            message: ERRORS.INVALID_PIPE_PAIR,
            status: 400,
        });
        expect(getPipePair).toHaveBeenCalledWith(data.suction_size, data.liquid_size);
        expect(updatedOrder).not.toHaveBeenCalled();
        expect(getOrderById).not.toHaveBeenCalled();
    });

    it('should throw error if order is not found after update', async () => {
        const data = {
            id: 1,
            suction_size: '3/4',
            liquid_size: '3/8',
            length: 10,
            quantity: 2,
        };
        getPipePair.mockResolvedValue({id: 1});
        updatedOrder.mockResolvedValue([0]);
        await expect(updateOrderService(data)).rejects.toThrow(ERRORS.ORDER_NOT_FOUND);

        expect(getPipePair).toHaveBeenCalledWith(data.suction_size, data.liquid_size);
        expect(updatedOrder).toHaveBeenCalledWith(
            {
                pipe_pair_id: 1,
                length: data.length,
                quantity: data.quantity,
                comment: data.comment,
            },
            data.id
        );
        expect(getOrderById).not.toHaveBeenCalled();
    });

    it('should update order and return formatted summary', async () => {
        const data = {
            id: 1,
            suction_size: '3/4',
            liquid_size: '3/8',
            length: 10,
            quantity: 2,
            comment: 'updated comment',
        };
        getPipePair.mockResolvedValue({id: 5});
        updatedOrder.mockResolvedValue([1]);
        getOrderById.mockResolvedValue({
            id: 1,
            length: 10,
            quantity: 2,
            status: 'waiting',
            created_at: '2026-03-20T10:00:00.000Z',
            updated_at: '2026-03-20T11:00:00.000Z',
            completed_at: null,
            comment: 'updated comment',
            PipePair: {
                suction_size: '3/4',
                liquid_size: '3/8',
            },
        });
        const result = await updateOrderService(data);
        expect(getPipePair).toHaveBeenCalledTimes(1);
        expect(getPipePair).toHaveBeenCalledWith(data.suction_size, data.liquid_size);
        expect(updatedOrder).toHaveBeenCalledTimes(1);
        expect(updatedOrder).toHaveBeenCalledWith(
            {
                pipe_pair_id: 5,
                length: data.length,
                quantity: data.quantity,
                comment: data.comment,
            },
            data.id
        );

        expect(getOrderById).toHaveBeenCalledTimes(1);
        expect(getOrderById).toHaveBeenCalledWith(data.id);

        expect(result).toEqual({
            order: {
                id: 1,
                suction_size: '3/4',
                liquid_size: '3/8',
                length: 10,
                quantity: 2,
                status: 'waiting',
                created_at: '2026-03-20T10:00:00.000Z',
                comment: 'updated comment',
                updated_at: '2026-03-20T11:00:00.000Z',
                completed_at: null,
            },
        });
    });
});