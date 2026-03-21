import ApiError from "../../utils/ApiError.js";
import { signAccessToken } from "../../utils/jwt.js";
import { authorization } from "./authorization.queries.js";

export async function authorizationService (initData) {
    const params = new URLSearchParams(initData);
    const user = JSON.parse(params.get('user'));
    const userAccess = await authorization(user);
    if (!userAccess) return next(ApiError.forbidden('Access denied'));
    const token = signAccessToken({
        uid: userAccess.id,
        telegramId: userAccess.telegram_id,
        role: userAccess.role
    });
    return {
        accessToken: token,
        user: {
            telegramId: userAccess.telegram_id,
            role: userAccess.role,
            name: userAccess.name
    }}
};
