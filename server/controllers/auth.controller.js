import { authorizationService } from "../services/authorization/authorization.service.js";

class AuthController {
    async auth (req, res, next) {
        try {
            const { initData } = req.body;
            const accessResponse = await authorizationService(initData)
            return res.json(accessResponse);
        } catch (error) {
            return (next(error));
        }
    }
};

export default new AuthController();
