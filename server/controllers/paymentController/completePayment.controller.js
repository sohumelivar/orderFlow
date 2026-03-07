import { Payment } from '../../models/index.js';
import ApiError from '../../src/utils/ApiError.js';

class CompletePaymentController {
    async completePayment (req, res, next) {
        try {
            const id = Number(req.params.id);
            if (req.user.role !== 'manufacturer') return next(ApiError.badRequest('Invalid role'));
            const payment = await Payment.findByPk(id);
            console.log('payment --->>>: ', payment);
            await payment.update({status: 'accepted'});
            return res.json({payment});
        } catch (error) {
            next(error);
        }
    }
};

export default new CompletePaymentController();