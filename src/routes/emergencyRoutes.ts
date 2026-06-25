import { Router } from 'express';
import { handleTriggerPanic, handleGetPanicLogs } from '../controllers/emergencyController';
import { authMiddleware } from '../middlewares/authMiddleware';
 
const emergencyRouter = Router();
 
emergencyRouter.post('/panic/trigger', authMiddleware, handleTriggerPanic);
emergencyRouter.get('/panic/logs/:id', authMiddleware, handleGetPanicLogs);
 
export default emergencyRouter;