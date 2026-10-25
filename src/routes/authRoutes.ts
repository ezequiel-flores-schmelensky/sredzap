import { Router } from 'express';
import { authCallback, authGithub } from '../controllers/authController';

const router = Router();

// Route to initiate the GitHub flow
router.get('/github', authGithub);

// Callback path (GitHub redirects here)
router.get('/github/callback', authCallback);

export default router;