import { Router } from 'express';
import { handleListContatos, handleAddContato } from '../controllers/contatoController';

const router = Router();

router.get('/', handleListContatos);

router.post('/', handleAddContato);

export default router;