import { Router, RequestHandler} from 'express';
import { getZaps, createZap, updateZap } from '../controllers/zapController';
import { authenticateToken } from '../middlewares/authMiddleware';


const router = Router();

//router.use(authenticateToken as RequestHandler);
// Usa "as RequestHandler" para decirle a TypeScript que estas funciones
// son manejadores de rutas válidos para Express
router.get('/', authenticateToken, getZaps as unknown as RequestHandler);
router.post('/', authenticateToken, createZap as unknown as RequestHandler);
router.put('/:id', authenticateToken, updateZap as unknown as RequestHandler);

export default router;