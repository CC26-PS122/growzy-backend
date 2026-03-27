import express from 'express';
import { authMiddleware, getUser, putUser } from '../controllers/userController.js';
import { getUserProfile, putUserProfile } from '../controllers/profileController.js';
import { getCharacter } from '../controllers/characterController.js';
import { getDailyLogs, handleUpdateLog } from '../controllers/dailyLogController.js';

const authRouter = express.Router();

authRouter.use(authMiddleware);

authRouter.get('/user', getUser);
authRouter.put('/user', putUser);

authRouter.get('/user/profile', getUserProfile);
authRouter.put('/user/profile', putUserProfile);

authRouter.get('/user/characters/me', getCharacter);

authRouter.get('/user/daily-logs', getDailyLogs);

authRouter.put('/user/daily-logs', handleUpdateLog);

export default authRouter;