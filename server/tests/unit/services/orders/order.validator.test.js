import { describe, it, expect } from '@jest/globals';
import ERRORS from '../../../../constants/errors.js';
import { orderValidator } from '../../../../services/orders/order.validator.js';

describe('orderValidator', () => {
	describe('create', () => {
		it('should not throw for valid create data', () => {
			const data = {
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
			expect(() => orderValidator.create(data, user)).not.toThrow();
		});

		it('should throw error if suction_size is invalid', () => {
			const data = {
				suction_size: '100/100',
				liquid_size: '3/8',
				length: 10,
				quantity: 2,
				price_per_meter: 5,
			};
			const user = {
				uid: 1,
				telegramId: '123456789',
				role: 'owner',
			};
			expect(() => orderValidator.create(data, user)).toThrow(ERRORS.INVALID_SUCTION_SIZE);
		});

		it('should throw error if liquid_size is invalid', () => {
			const data = {
				suction_size: '3/4',
				liquid_size: '100/100',
				length: 10,
				quantity: 2,
				price_per_meter: 5,
			};
			const user = {
				uid: 1,
				telegramId: '123456789',
				role: 'owner',
			};
			expect(() => orderValidator.create(data, user)).toThrow(ERRORS.INVALID_LIQUID_SIZE);
		});

		it('should throw error if length is invalid', () => {
			const data = {
				suction_size: '3/4',
				liquid_size: '3/8',
				length: 0,
				quantity: 2,
				price_per_meter: 5,
			};
			const user = {
				uid: 1,
				telegramId: '123456789',
				role: 'owner',
			};

			expect(() => orderValidator.create(data, user)).toThrow(ERRORS.INVALID_LENGTH);
		});

		it('should throw error if quantity is invalid', () => {
			const data = {
				suction_size: '3/4',
				liquid_size: '3/8',
				length: 10,
				quantity: 0,
				price_per_meter: 5,
			};
			const user = {
				uid: 1,
				telegramId: '123456789',
				role: 'owner',
			};
			expect(() => orderValidator.create(data, user)).toThrow(ERRORS.INVALID_QUANTITY);
		});

		it('should throw error if price_per_meter is invalid', () => {
			const data = {
				suction_size: '3/4',
				liquid_size: '3/8',
				length: 10,
				quantity: 2,
				price_per_meter: 0,
			};
			const user = {
				uid: 1,
				telegramId: '123456789',
				role: 'owner',
			};

			expect(() => orderValidator.create(data, user)).toThrow(ERRORS.INVALID_PRICE);
		});
		it('should throw error if comment is not string', () => {
			const data = {
				suction_size: '3/4',
				liquid_size: '3/8',
				length: 10,
				quantity: 2,
				price_per_meter: 5,
				comment: 123,
			};
			const user = {
				uid: 1,
				telegramId: '123456789',
				role: 'owner',
			};
			expect(() => orderValidator.create(data, user)).toThrow(ERRORS.INVALID_COMMENT);
		});

		it('should throw error if user uid is invalid', () => {
			const data = {
				suction_size: '3/4',
				liquid_size: '3/8',
				length: 10,
				quantity: 2,
				price_per_meter: 5,
			};
			const user = {
				uid: 0,
				telegramId: '123456789',
				role: 'owner',
			};

			expect(() => orderValidator.create(data, user)).toThrow(ERRORS.INVALID_USER_ID);
		});

		it('should throw error if telegramId is invalid', () => {
			const data = {
				suction_size: '3/4',
				liquid_size: '3/8',
				length: 10,
				quantity: 2,
				price_per_meter: 5,
			};
			const user = {
				uid: 1,
				telegramId: 'abc123',
				role: 'owner',
			};

			expect(() => orderValidator.create(data, user)).toThrow(ERRORS.INVALID_TELEGRAM_ID);
		});

		it('should throw error if role is invalid', () => {
			const data = {
				suction_size: '3/4',
				liquid_size: '3/8',
				length: 10,
				quantity: 2,
				price_per_meter: 5,
			};
			const user = {
				uid: 1,
				telegramId: '123456789',
				role: 'admin',
			};

			expect(() => orderValidator.create(data, user)).toThrow(ERRORS.INVALID_ROLE);
		});
	});

	describe('delete', () => {
		it('should not throw for valid id', () => {
			expect(() => orderValidator.delete(1)).not.toThrow();
		});

		it('should throw error if id is invalid', () => {
			expect(() => orderValidator.delete(1.5)).toThrow(ERRORS.INVALID_ORDER_ID);
		});
	});

	describe('updateStatus', () => {
		it('should not throw for valid id', () => {
			expect(() => orderValidator.updateStatus(1)).not.toThrow();
		});

		it('should throw error if id is invalid', () => {
			expect(() => orderValidator.updateStatus('abc')).toThrow(ERRORS.INVALID_ORDER_ID);
		});
	});

	describe('complete', () => {
		it('should not throw for valid complete data', () => {
			const data = {
				id: 1,
				completed_quantity: 2,
			};
			const user = {
				uid: 1,
				telegramId: '123456789',
				role: 'manufacturer',
			};

			expect(() => orderValidator.complete(data, user)).not.toThrow();
		});

		it('should throw error if completed_quantity is invalid', () => {
			const data = {
				id: 1,
				completed_quantity: 0,
			};
			const user = {
				uid: 1,
				telegramId: '123456789',
				role: 'manufacturer',
			};

			expect(() => orderValidator.complete(data, user)).toThrow(ERRORS.INVALID_COMPLETED_QUANTITY);
		});
	});

	describe('update', () => {
		it('should not throw for valid update data', () => {
			const data = {
				id: 1,
				suction_size: '3/4',
				liquid_size: '3/8',
				length: 10,
				quantity: 2,
				comment: 'updated',
			};

			expect(() => orderValidator.update(data)).not.toThrow();
		});

		it('should throw error if id is invalid', () => {
			const data = {
				id: 0,
				suction_size: '3/4',
				liquid_size: '3/8',
				length: 10,
				quantity: 2,
			};

			expect(() => orderValidator.update(data)).toThrow(ERRORS.INVALID_ORDER_ID);
		});
	});
});