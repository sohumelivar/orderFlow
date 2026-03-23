import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import ERRORS from '../../../../constants/errors.js';
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

const { updateOrderStatusService } = await import('../../../../services/orders/orders.service.js');
const { getOrderById, updateOrderStatus } = await import('../../../../services/orders/orders.queries.js');

describe('updateOrderStatusService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw error if id is not found', async () => {
        await expect(updateOrderStatusService(undefined)).rejects.toMatchObject({
            message: ERRORS.INVALID_ORDER_ID,
            status: 400,
        });
        expect(getOrderById).not.toHaveBeenCalled();
        expect(updateOrderStatus).not.toHaveBeenCalled();
    });

    it('should throw error if order is not found', async () => {
        getOrderById.mockResolvedValue(null);
        await expect(updateOrderStatusService(1)).rejects.toMatchObject({
            message: ERRORS.INVALID_REQUEST,
            status: 400,
        });
        expect(getOrderById).toHaveBeenCalledWith(1);
        expect(updateOrderStatus).not.toHaveBeenCalled();
    });

    it('should throw error if order status is completed', async () => {
        getOrderById.mockResolvedValue({
            id: 1,
            status: 'completed',
        });
        await expect(updateOrderStatusService(1)).rejects.toMatchObject({
            message: ERRORS.INVALID_REQUEST,
            status: 400,
        });
        expect(getOrderById).toHaveBeenCalledTimes(1);
        expect(updateOrderStatus).not.toHaveBeenCalled();
    });

    it('should update status from waiting to in_progress', async () => {
        getOrderById.mockResolvedValue({
            id: 1,
            length: 10,
            quantity: 2,
            status: ORDER_STATUS.WAITING,
            created_at: '2026-03-20T10:00:00.000Z',
            updated_at: '2026-03-20T10:00:00.000Z',
            completed_at: null,
            comment: 'test comment',
            PipePair: {
                suction_size: '3/4',
                liquid_size: '3/8',
            },
        });
        updateOrderStatus.mockResolvedValue({
            id: 1,
            length: 10,
            quantity: 2,
            status: ORDER_STATUS.IN_PROGRESS,
            created_at: '2026-03-20T10:00:00.000Z',
            updated_at: '2026-03-20T10:00:00.000Z',
            completed_at: null,
            comment: 'test comment',
            PipePair: {
                suction_size: '3/4',
                liquid_size: '3/8',
            },
        });
        const result = await updateOrderStatusService(1);
        expect(getOrderById).toHaveBeenCalledTimes(1);
        expect(getOrderById).toHaveBeenCalledWith(1);
        expect(updateOrderStatus).toHaveBeenCalledWith(1, ORDER_STATUS.IN_PROGRESS);
        expect(result).toEqual({
            order:{
                id: 1,
                suction_size: '3/4',
                liquid_size: '3/8',
                length: 10,
                quantity: 2,
                status: ORDER_STATUS.IN_PROGRESS,
                created_at: '2026-03-20T10:00:00.000Z',
                comment: 'test comment',
                updated_at: '2026-03-20T10:00:00.000Z',
                completed_at: null,
            }
        });
    });

    it('should update status from in_progress to waiting', async () => {
        getOrderById.mockResolvedValue({
            id: 1,
            length: 10,
            quantity: 2,
            status: ORDER_STATUS.IN_PROGRESS,
            created_at: '2026-03-20T10:00:00.000Z',
            updated_at: '2026-03-20T10:00:00.000Z',
            completed_at: null,
            comment: 'test comment',
            PipePair: {
                suction_size: '3/4',
                liquid_size: '3/8',
            },
        });
        updateOrderStatus.mockResolvedValue({
            id: 1,
            length: 10,
            quantity: 2,
            status: ORDER_STATUS.WAITING,
            created_at: '2026-03-20T10:00:00.000Z',
            updated_at: '2026-03-20T10:00:00.000Z',
            completed_at: null,
            comment: 'test comment',
            PipePair: {
                suction_size: '3/4',
                liquid_size: '3/8',
            },
        });
        const result = await updateOrderStatusService(1);
        expect(getOrderById).toHaveBeenCalledTimes(1);
        expect(getOrderById).toHaveBeenCalledWith(1);
        expect(updateOrderStatus).toHaveBeenCalledWith(1, ORDER_STATUS.WAITING);
        expect(result).toEqual({
            order:{
                id: 1,
                suction_size: '3/4',
                liquid_size: '3/8',
                length: 10,
                quantity: 2,
                status: ORDER_STATUS.WAITING,
                created_at: '2026-03-20T10:00:00.000Z',
                comment: 'test comment',
                updated_at: '2026-03-20T10:00:00.000Z',
                completed_at: null,
            }
        });
    });
});
