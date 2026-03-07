import { Order, PipePair } from '../models/index.js';
import ApiError from '../src/utils/ApiError.js';

class StatsController {
    async getStats (req, res, next) {
        try {
            const { period, month, year } = req.query;
            console.log('period, month, year', period, month, year);
            
            return res.json('stats');
        } catch (error) {
            next(error);
        }
    }
};

export default new StatsController();