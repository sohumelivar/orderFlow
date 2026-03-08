import { Payment } from '../../models/index.js';
import ApiError from '../../src/utils/ApiError.js';

class CompletePaymentController {
    async completePayment (req, res, next) {
        try {
            const id = Number(req.params.id);
            // if (req.user.role !== 'manufacturer') return next(ApiError.badRequest('Invalid role'));
            const payment = await Payment.findByPk(id);
            //! !!!!!!!!!!!!!!!!!!!!
            const now = new Date();
            await payment.update({status: 'pending',
                //!!!!
                created_at: new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 15))
                //!!!!
            });
            return res.json({payment});
        } catch (error) {
            next(error);
        }
    }
};

export default new CompletePaymentController();