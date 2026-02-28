import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        ok: true,
        service: 'orderflow-server',
        time: new Date().toISOString()
    });
});

export default router;