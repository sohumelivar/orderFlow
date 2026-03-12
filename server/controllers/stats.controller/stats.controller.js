import ApiError from '../../src/utils/ApiError.js';
import { 
    buildLastMonthStats,
    buildLastWeekStats,
    buildAllTimeStats,
    buildACustomMonthStats,
} from '../../services/stats/stats.service.js';

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
                    const summary = await buildACustomMonthStats(month, year);
                    return res.json(summary);
            }
            return next(ApiError.badRequest('Invalid request'));
        } catch (error) {
            next(error);
        }
    }
};

export default new StatsController();
