import { PipePair } from '../models/index.js';

class PipePairsController {
    async getAll (req, res, next) {
        try {
            const data = await PipePair.findAll({order: [['id', 'ASC']]});
            res.json(data);
        } catch (error) {
            return (next(error));
        }
    };
};

export default new PipePairsController();