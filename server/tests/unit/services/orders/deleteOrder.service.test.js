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

const { deleteOrder } = await import('../../../../services/orders/orders.service.js');
const { getOrderById, destroyOrder } = await import('../../../../services/orders/orders.queries.js');

describe('deleteOrder', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw error if id is not found', async () => {
        await expect(deleteOrder(undefined)).rejects.toMatchObject({
            message: ERRORS.INVALID_ORDER_ID,
            status: 400,
        });
        expect(getOrderById).not.toHaveBeenCalled();
        expect(destroyOrder).not.toHaveBeenCalled();
    });

    it('should throw error if order is not found', async () => {
        getOrderById.mockResolvedValue(null);
        await expect(deleteOrder(1)).rejects.toThrow('Invalid request');
        expect(getOrderById).toHaveBeenCalledWith(1);
        expect(destroyOrder).not.toHaveBeenCalled();
    });

    it('should delete order and return success response', async () => {
        getOrderById.mockResolvedValue({
            id: 1,
            status: 'waiting',
        });
        destroyOrder.mockResolvedValue();
        const result = await deleteOrder(1);
        expect(getOrderById).toHaveBeenCalledTimes(1);
        expect(getOrderById).toHaveBeenCalledWith(1);
        expect(destroyOrder).toHaveBeenCalledTimes(1);
        expect(destroyOrder).toHaveBeenCalledWith(1);
        expect(result).toEqual({
            success: true,
            id: 1,
        });
    });

    it('should throw error if order status is completed', async () => {
        getOrderById.mockResolvedValue({
            id: 1,
            status: 'completed',
        });
        await expect(deleteOrder(1)).rejects.toMatchObject({
            message: ERRORS.INVALID_REQUEST,
            status: 400,
        });
        expect(getOrderById).toHaveBeenCalledTimes(1);
        expect(destroyOrder).not.toHaveBeenCalled();
    });

    it('should throw error if order status is in progress', async () => {
        getOrderById.mockResolvedValue({
            id: 1,
            status: 'in_progress',
        });
        await expect(deleteOrder(1)).rejects.toMatchObject({
            message: ERRORS.INVALID_REQUEST,
            status: 400,
        });
        expect(getOrderById).toHaveBeenCalledTimes(1);
        expect(getOrderById).toHaveBeenCalledWith(1);
        expect(destroyOrder).not.toHaveBeenCalled();
    });
});
