import { Router } from 'express';
import { handleListContatos, handleAddContato } from '../controllers/contatoController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, handleListContatos);
router.post('/', authMiddleware, handleAddContato);

export default router;