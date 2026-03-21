import { verifyTelegramInitData } from '../utils/telegram.js';
import ApiError from '../utils/ApiError.js';

export function telegramInitDataRequired(req, res, next) {
    const { initData } = req.body || {};
    if (!initData) return next(ApiError.badRequest('initData is required'));
    
    const ok = verifyTelegramInitData(initData, process.env.TELEGRAM_BOT_TOKEN);
    if (!ok) return next(ApiError.unauthorized('Invalid initData'));
    
    return next();
}