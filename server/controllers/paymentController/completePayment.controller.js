import { Payment } from '../../models/index.js';
import ApiError from '../../src/utils/ApiError.js';

class CompletePaymentController {
    async completePayment (req, res, next) {
        try {
            const id = Number(req.params.id);
            if (req.user.role !== 'manufacturer') return next(ApiError.badRequest('Invalid role'));
            const payment = await Payment.findByPk(id);
            await payment.update({status: 'completed'});
            return res.json({payment});
        } catch (error) {
            next(error);
        }
    }
};

export default new CompletePaymentController();