import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { handleListContatos, handleAddContato, handleDeleteContato } from '../controllers/contatoController';


const router = Router();

router.get('/', authMiddleware, handleListContatos);
router.post('/', authMiddleware, handleAddContato);
router.delete('/:id', authMiddleware, handleDeleteContato);

export default router;