import express from 'express';
import { signup, login } from '../controllers/userController.js';
import { getSurvey, calculateSurveyHandler } from '../controllers/surveyController.js';

const router = express.Router();

router.get('/survey', getSurvey);
router.post('/survey/recommend', calculateSurveyHandler);
router.post('/signup', signup);
router.post('/login', login);

export default router;