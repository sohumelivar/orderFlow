import { Router } from 'express';
import { authRequired } from '../middlewares/checkAuth.js';
import statsController from '../controllers/stats.controller.js';

const router = Router();

router.get('/', authRequired, statsController.getStats);

export default router;