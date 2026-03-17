import { completePaymentService } from '../../services/payments/payments.service.js';

class CompletePaymentController {
    async completePayment (req, res, next) {
        try {
            const acceptedPayment = await completePaymentService(req.params.id, req.user);
            return res.json({payment: acceptedPayment});
        } catch (error) {
            next(error);
        }
    }
};

export default new CompletePaymentController();
