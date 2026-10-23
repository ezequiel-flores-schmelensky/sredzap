import { Router } from 'express';
import { authCallback, authGithub } from '../controllers/authController';

const router = Router();

// Ruta para iniciar el flujo de GitHub
router.get('/github', authGithub);

// Ruta de Callback (GitHub redirige aquí)
router.get('/github/callback', authCallback);

export default router;