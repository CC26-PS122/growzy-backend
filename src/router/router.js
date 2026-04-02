import express from 'express';
import { signup, login } from '../controllers/userController.js';
import { getSurvey, calculateSurveyHandler } from '../controllers/surveyController.js';
import { handleReminderJob } from '../controllers/reminderController.js';

const router = express.Router();

router.get('/cron/reminder', handleReminderJob);

router.get('/survey', getSurvey);
router.post('/survey/recommend', calculateSurveyHandler);
router.post('/signup', signup);
router.post('/login', login);

export default router;