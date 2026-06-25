import { Router } from 'express';
import { handleTriggerPanic, handleGetEmergencyLogs } from '../controllers/emergencyController';
import { authMiddleware } from '../middlewares/authMiddleware';

const emergencyRouter = Router();

emergencyRouter.post('/panic/trigger', authMiddleware, handleTriggerPanic);

emergencyRouter.get('/logs/:userId', authMiddleware, handleGetEmergencyLogs);

export default emergencyRouter;