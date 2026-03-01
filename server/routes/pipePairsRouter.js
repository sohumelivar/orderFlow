import { Router } from 'express';
import pipePairsController from '../controllers/pipePair.controller.js';

const router = Router();

router.get('/', pipePairsController.getAll);

export default router;