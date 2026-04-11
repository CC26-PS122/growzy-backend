import express from 'express';
import { signup, login, resendEmail } from '../controllers/userController.js';
import { getSurvey, calculateSurveyHandler } from '../controllers/surveyController.js';

const router = express.Router();

router.get('/survey', getSurvey);
router.post('/survey/recommendation', calculateSurveyHandler);
router.post('/register', signup);
router.post('/resend-email', resendEmail);
router.post('/login', login);

export default router;