import { Router } from 'express';
import pipePairsRouter from './pipePairsRouter.js';

const router = Router();

router.use('/pipe_pairs', pipePairsRouter);

export default router;