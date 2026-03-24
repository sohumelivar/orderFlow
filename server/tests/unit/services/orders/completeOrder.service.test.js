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

jest.unstable_mockModule('../../../../services/orders/order.validator.js', () => ({
	orderValidator: {
		complete: jest.fn(),
	},
}));

const {
	completeOrder,
} = await import('../../../../services/orders/orders.service.js');

const {
	getOrderById,
	createNewOrderAfterComplete,
} = await import('../../../../services/orders/orders.queries.js');

const {
	orderValidator,
} = await import('../../../../services/orders/order.validator.js');

describe('completeOrder', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should throw error if order is not found', async () => {
		const data = { id: 1, completed_quantity: 2 };
		const user = { uid: 10 };

		getOrderById.mockResolvedValue(null);

		await expect(completeOrder(data, user)).rejects.toMatchObject({
			message: ERRORS.INVALID_REQUEST,
		});

		expect(orderValidator.complete).toHaveBeenCalledWith(data, user);
		expect(getOrderById).toHaveBeenCalledWith(1);
		expect(createNewOrderAfterComplete).not.toHaveBeenCalled();
	});

	it('should throw error if order status is completed', async () => {
		const data = { id: 1, completed_quantity: 2 };
		const user = { uid: 10 };

		getOrderById.mockResolvedValue({
			id: 1,
			status: ORDER_STATUS.COMPLETED,
			quantity: 5,
		});

		await expect(completeOrder(data, user)).rejects.toMatchObject({
			message: ERRORS.INVALID_REQUEST,
		});

		expect(orderValidator.complete).toHaveBeenCalledWith(data, user);
		expect(getOrderById).toHaveBeenCalledWith(1);
		expect(createNewOrderAfterComplete).not.toHaveBeenCalled();
	});

	it('should throw error if completed quantity is greater than order quantity', async () => {
		const data = { id: 1, completed_quantity: 10 };
		const user = { uid: 10 };

		getOrderById.mockResolvedValue({
			id: 1,
			status: ORDER_STATUS.WAITING,
			quantity: 5,
		});

		await expect(completeOrder(data, user)).rejects.toMatchObject({
			message: ERRORS.INVALID_QUANTITY,
		});

		expect(orderValidator.complete).toHaveBeenCalledWith(data, user);
		expect(getOrderById).toHaveBeenCalledWith(1);
		expect(createNewOrderAfterComplete).not.toHaveBeenCalled();
	});

	it('should complete order fully when completed quantity equals order quantity', async () => {
		const data = { id: 1, completed_quantity: 5 };
		const user = { uid: 10 };

		const updateMock = jest.fn().mockResolvedValue();

		getOrderById.mockResolvedValue({
			id: 1,
			length: 10,
			quantity: 5,
			status: ORDER_STATUS.WAITING,
			created_at: '2026-03-24T10:00:00.000Z',
			updated_at: '2026-03-24T10:00:00.000Z',
			completed_at: null,
			comment: 'test comment',
			update: updateMock,
			PipePair: {
				suction_size: '3/4',
				liquid_size: '3/8',
			},
		});

		const result = await completeOrder(data, user);

		expect(orderValidator.complete).toHaveBeenCalledWith(data, user);
		expect(getOrderById).toHaveBeenCalledWith(1);

		expect(updateMock).toHaveBeenCalledTimes(1);
		expect(updateMock).toHaveBeenCalledWith({
			status: ORDER_STATUS.COMPLETED,
			manufacturer_id: user.uid,
			completed_at: expect.any(Date),
		});

		expect(createNewOrderAfterComplete).not.toHaveBeenCalled();

		expect(result).toEqual({
			order: {
				id: 1,
				suction_size: '3/4',
				liquid_size: '3/8',
				length: 10,
				quantity: 5,
				status: ORDER_STATUS.WAITING,
				created_at: '2026-03-24T10:00:00.000Z',
				comment: 'test comment',
				updated_at: '2026-03-24T10:00:00.000Z',
				completed_at: null,
			},
		});
	});

	it('should split order when completed quantity is less than order quantity', async () => {
		const data = { id: 1, completed_quantity: 4 };
		const user = { uid: 10 };

		const updateMock = jest.fn().mockResolvedValue();

		const order = {
			id: 1,
			length: 10,
			quantity: 10,
			status: ORDER_STATUS.WAITING,
			created_at: '2026-03-24T10:00:00.000Z',
			updated_at: '2026-03-24T10:00:00.000Z',
			completed_at: null,
			comment: 'test comment',
			update: updateMock,
			PipePair: {
				suction_size: '3/4',
				liquid_size: '3/8',
			},
		};

		getOrderById.mockResolvedValue(order);

		const result = await completeOrder(data, user);

		expect(orderValidator.complete).toHaveBeenCalledWith(data, user);
		expect(getOrderById).toHaveBeenCalledWith(1);

		expect(createNewOrderAfterComplete).toHaveBeenCalledTimes(1);
		expect(createNewOrderAfterComplete).toHaveBeenCalledWith(order, 4, user.uid);

		expect(updateMock).toHaveBeenCalledTimes(1);
		expect(updateMock).toHaveBeenCalledWith({
			status: ORDER_STATUS.WAITING,
			quantity: 6,
		});

		expect(result).toEqual({
			order: {
				id: 1,
				suction_size: '3/4',
				liquid_size: '3/8',
				length: 10,
				quantity: 10,
				status: ORDER_STATUS.WAITING,
				created_at: '2026-03-24T10:00:00.000Z',
				comment: 'test comment',
				updated_at: '2026-03-24T10:00:00.000Z',
				completed_at: null,
			},
		});
	});
});