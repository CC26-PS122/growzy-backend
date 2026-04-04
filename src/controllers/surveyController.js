import { calculateRecommendation, getQuestions } from "../services/surveyService.js";

export const getSurvey = async (req, res) => {
  try {
    const result = await getQuestions();
    res.status(200).json({
      success: true,
      message: "Surveys fetched successfully!",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch surveys",
      error: error.message
    });
  }
};

export const calculateSurveyHandler = async (req, res) => {
  try {
    const { drink_answer, mood_answer, sleep_answer } = req.body;

    if (!drink_answer || !mood_answer || !sleep_answer) {
      return res.status(400).json({
        success: false,
        message: 'drink_answer, mood_answer, sleep_answer are required'
      });
    }

    const result = await calculateRecommendation(drink_answer, mood_answer, sleep_answer);

    res.status(200).json({
      success: true,
      message: 'Based on your habits, we suggest this goal!',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to calculate recommendations",
      error: error.message
    });
  }
};