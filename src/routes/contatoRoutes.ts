import { Router } from 'express';
import { getContatos, createContato } from '../controllers/contatoController';

const router = Router();

router.get('/', getContatos);

router.post('/', createContato);

export default router;