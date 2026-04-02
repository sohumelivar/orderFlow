import { authorizationService } from "../services/authorization/authorization.service.js";

class AuthController {
    async auth (req, res, next) {
        try {
            const { initData } = req.body;
            console.log('auth request: ', initData);
            
            const accessResponse = await authorizationService(initData);
            console.log('auth response: ', accessResponse);
            
            return res.json(accessResponse);
        } catch (error) {
            return (next(error));
        }
    }
};

export default new AuthController();
