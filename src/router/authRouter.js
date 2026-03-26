import express from 'express';
import { authMiddleware, getUser, putUser } from '../controllers/userController.js';
import { getUserProfile, putUserProfile } from '../controllers/profileController.js';
import { getCharacter } from '../controllers/characterController.js';
import { getDailyLogs, postDailyLog, postMoodLog, postSleepLog } from '../controllers/dailyLogController.js';
import { postWaterLog } from '../controllers/waterTransactionController.js';

const authRouter = express.Router();

authRouter.use(authMiddleware);

authRouter.get('/user', getUser);
authRouter.put('/user', putUser);

authRouter.get('/user/profile', getUserProfile);
authRouter.put('/user/profile', putUserProfile);
// authRouter.post('/user/profile', postUserProfile);

authRouter.get('/user/characters/me', getCharacter);
// authRouter.post('/user/characters/me', postCharacter);

authRouter.get('/user/daily-logs', getDailyLogs);
authRouter.post('/user/daily-logs', postDailyLog);

authRouter.post('/user/sleep-logs', postSleepLog);
authRouter.post('/user/mood-logs', postMoodLog);
authRouter.post('/user/water-logs', postWaterLog);

export default authRouter;