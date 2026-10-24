import { Router } from 'express';
import authRoutes from './authRoutes';
import zapRoutes from './zapRoutes';
import webhookRoutes from './webhookRoutes';

const router = Router();


router.use('/auth', authRoutes);
router.use('/zaps', zapRoutes);
router.use('/webhooks', webhookRoutes);


export default router;
