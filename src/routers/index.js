import { Router } from 'express';
import authRouter from './auth.router.js'
import tourRouter from './tour.router.js'
const router = Router();

router.use('/api/v1', authRouter);
router.use('/api/v1', tourRouter);

export default router;