import { Router, Response, NextFunction } from 'express';
import { getZaps, createZap, updateZap } from '../controllers/ZapController';
import { AuthRequest } from '../models/AuthRquest';

const router = Router();

// Middleware de autenticación
const isAuthenticated = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'No autorizado' });
};

router.use(isAuthenticated as any);

// Asignación de controladores a las rutas
router.get('/', getZaps);
router.post('/', createZap);
router.put('/:id', updateZap);

export default router;