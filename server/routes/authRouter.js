import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import { telegramInitDataRequired } from '../middlewares/telegramAuth.js';

const router = Router();

router.post('/telegram', telegramInitDataRequired, authController.auth);

export default router;