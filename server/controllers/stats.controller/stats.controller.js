import ApiError from '../../utils/ApiError.js';
import { 
    buildLastMonthStats,
    buildLastWeekStats,
    buildAllTimeStats,
    buildACustomMonthStats,
    buildCustomYearStats
} from '../../services/stats/stats.service.js';

class StatsController {
    async getStats (req, res, next) {
        try {
            const { period, month, year } = req.query;

            if (period === 'last_month') {
                const summary = await buildLastMonthStats();
                return res.json(summary);
            }

            if (period === 'last_week') {
                const summary = await buildLastWeekStats();
                return res.json(summary);
            }

            if (period === 'all_time') {
                const summary = await buildAllTimeStats();
                return res.json(summary);
            }

            if (month && year) {
                const summary = await buildACustomMonthStats(Number(month), Number(year));
                return res.json(summary);
            }

            if (year) {
                const summary = await buildCustomYearStats(Number(year));
                return res.json(summary);
            }

            return next(ApiError.badRequest('Invalid request'));
        } catch (error) {
            next(error);
        }
    }
};

export default new StatsController();
