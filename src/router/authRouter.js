import express from 'express';
import { authMiddleware, getUser, putUser } from '../controllers/userController.js';
import { getUserProfile, putUserProfile } from '../controllers/profileController.js';
import { getCharacter } from '../controllers/characterController.js';
import { getDailyLogs, handleUpdateLog } from '../controllers/dailyLogController.js';

const authRouter = express.Router();

authRouter.use(authMiddleware);

authRouter.get('/user', getUser);
authRouter.put('/user', putUser);

authRouter.get('/profile', getUserProfile);
authRouter.put('/profile', putUserProfile);

authRouter.get('/character', getCharacter);

authRouter.get('/daily-logs', getDailyLogs);

authRouter.put('/daily-logs', handleUpdateLog);

export default authRouter;