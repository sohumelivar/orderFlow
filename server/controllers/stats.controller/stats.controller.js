import ApiError from '../../src/utils/ApiError.js';
import { buildLastMonthStats } from '../../services/stats/stats.service.js';

class StatsController {
    async getStats (req, res, next) {
        try {
            const { period, month, year } = req.query;
            if (period) {
                if(period === 'last_month') {
                    const summary = await buildLastMonthStats();
                    return res.json(summary);
                } else if (period === 'last_week') {
                    console.log('last week');
                } else if (period === 'all_time') {
                    console.log('all time');
                }
                
            } else {
                if(month && year) {
                    console.log('month: ', month);
                    console.log('year', year);
                }
            }
            return res.json('test');
        } catch (error) {
            next(error);
        }
    }
};

export default new StatsController();