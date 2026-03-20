import express from 'express';
import { authMiddleware, getUser, putUser } from '../controller/userController.js';
import { getUserProfile, postUserProfile } from '../controller/profileController.js';

const userRouter = express.Router();

userRouter.use(authMiddleware);
userRouter.get('/', getUser);
userRouter.put('/', putUser);
userRouter.get('/profile', getUserProfile);
userRouter.post('/profile', postUserProfile);

export default userRouter;