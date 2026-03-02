import jwt from 'jsonwebtoken';
import ApiError from '../src/utils/ApiError.js';

export function authRequired(req, res, next) {
    const header = req.headers.authorization || '';
    const [type, token] = header.split(' ');
    if (type !== 'Bearer' || !token) return next(ApiError.unauthorized('No token'));
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        return next();
    } catch {
        return next(ApiError.unauthorized('Invalid token'));
    }
}