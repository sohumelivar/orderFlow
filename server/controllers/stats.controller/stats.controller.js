import ApiError from '../../src/utils/ApiError.js';
import { buildLastMonthStats, buildLastWeekStats, buildAllTimeStats } from '../../services/stats/stats.service.js';

class StatsController {
    async getStats (req, res, next) {
        try {
            const { period, month, year } = req.query;
            if (period) {
                if(period === 'last_month') {
                    const summary = await buildLastMonthStats();
                    return res.json(summary);
                } else if (period === 'last_week') {
                    const summary = await buildLastWeekStats();
                    return res.json(summary);
                } else if (period === 'all_time') {
                    const summary = await buildAllTimeStats();
                    return res.json(summary);
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