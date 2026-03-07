import { Payment } from '../../models/index.js';
import ApiError from '../../src/utils/ApiError.js';

class PayOrderController {
    async payOrder (req, res, next) {
        try {
            const { amount } = req.body;
            if ( req.user.role !== 'owner' ) return next(ApiError.badRequest('Invalid request'));
            const newPayment = await Payment.create({
                owner_id: req.user.uid,
                amount,
                created_at: new Date(),
            })
            return res.json({ payment: newPayment });
        } catch (error) {
            next(error);
        }
    }
}

export default new PayOrderController();