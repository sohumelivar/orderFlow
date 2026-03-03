import { User } from '../models/User.js';
import ApiError from '../src/utils/ApiError.js';
import { signAccessToken } from '../src/utils/jwt.js';

class AuthController {
    async auth (req, res, next) {
        try {
            const { initData } = req.body;
            const params = new URLSearchParams(initData);
            const user = JSON.parse(params.get('user'));
            const userAccess = await User.findOne({where: {telegram_id: user.id}});

            if (!userAccess) return next(ApiError.forbidden('Access denied'));

            const token = signAccessToken({
                uid: userAccess.id,
                telegramId: userAccess.telegram_id,
                role: userAccess.role
            });

            res.json({
                accessToken: token,
                user: {
                    telegramId: userAccess.telegram_id,
                    role: userAccess.role,
                    name: userAccess.name
            }});
        } catch (error) {
            return (next(error));
        }
    }
};

export default new AuthController();
