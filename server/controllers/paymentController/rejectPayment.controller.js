import { rejectPaymentService } from '../../services/payments/payments.service.js';

class RejectPaymentController {
    async rejectPayment (req, res, next) {
        try {
            const rejectedPayment = await rejectPaymentService(Number(req.params.id), req.user);
            return res.json(rejectedPayment);
        } catch (error) {
            next(error);
        }
    };
};

export default new RejectPaymentController();
