import { Router, RequestHandler} from 'express';
import { getZaps, createZap, updateZap } from '../controllers/zapController';
import { authenticateToken } from '../middlewares/authMiddleware';


const router = Router();

// Use "as RequestHandler" to tell TypeScript that these functions
// are valid route handlers for Express
router.get('/', authenticateToken, getZaps as unknown as RequestHandler);
router.post('/', authenticateToken, createZap as unknown as RequestHandler);
router.put('/:id', authenticateToken, updateZap as unknown as RequestHandler);

export default router;