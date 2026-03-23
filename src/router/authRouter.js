import express from 'express';
import { authMiddleware, getUser, putUser } from '../controllers/userController.js';
import { getUserProfile, putUserProfile } from '../controllers/profileController.js';
import { getCharacter } from '../controllers/characterController.js';

const authRouter = express.Router();

authRouter.use(authMiddleware);

authRouter.get('/user', getUser);
authRouter.put('/user', putUser);

authRouter.get('/user/profile', getUserProfile);
authRouter.put('/user/profile', putUserProfile);
// authRouter.post('/user/profile', postUserProfile);

authRouter.get('/user/characters/me', getCharacter);
// authRouter.post('/user/characters/me', postCharacter);

export default authRouter;