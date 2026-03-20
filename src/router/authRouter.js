import express from 'express';
import { authMiddleware, getUser, putUser } from '../controller/userController.js';
import { getUserProfile, postUserProfile } from '../controller/profileController.js';

const authRouter = express.Router();

authRouter.use(authMiddleware);
authRouter.get('/user', getUser);
authRouter.put('/user', putUser);
authRouter.get('/user/profile', getUserProfile);
authRouter.post('/user/profile', postUserProfile);

export default authRouter;