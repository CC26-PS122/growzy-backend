import SurveyService from '../services/surveyService.js';

export const getSurvey = async (req, res) => {
  try {
    const data = await SurveyService.getAllQuestions();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const calculateRecommendation = async (req, res) => {
  try {
    const { drink_answer, mood_answer, sleep_answer } = req.body;

    if (!drink_answer || !mood_answer || !sleep_answer) {
      return res.status(400).json({ message: 'drink_answer, mood_answer, sleep_answer are required' });
    }

    const result = await SurveyService.calculateRecommendation(drink_answer, mood_answer, sleep_answer);

    res.status(200).json({
      result,
      message: 'Based on your habits, we suggest this goal!',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
