import { Payment } from '../../models/index.js';
import ApiError from '../../src/utils/ApiError.js';

class RejectPaymentController {
    async rejectPayment (req, res, next) {
        try {
            const id = Number(req.params.id);
            if (req.user.role !== 'manufacturer') return next(ApiError.badRequest('Invalid Gi'));
            const payment = await Payment.findByPk(id);
            if (payment.status !== 'pending') return next(ApiError.badRequest('Invalid status'));
            await payment.update({status: 'rejected'});
            return res.json({payment});
        } catch (error) {
            next(error);
        }
    }
};

export default new RejectPaymentController();