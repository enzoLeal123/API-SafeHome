import { Router } from 'express';
import * as popupController from '../controllers/popupController';
import { authMiddleware } from '../middlewares/authMiddleware'; 

const router = Router();

router.get('/:tipo', authMiddleware, popupController.handleGetGeneralPopup);

export default router;
