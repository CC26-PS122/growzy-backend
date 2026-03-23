import Survey from '../models/Survey.js';

class SurveyService {
  static async getAllQuestions() {
    try {
      const questions = await Survey.getQuestions();
      return questions;
    } catch (error) {
      console.error('Error fetching survey questions:', error);
      throw error;
    }
  }

  static async getOptionById(optionId) {
    try {
      const option = await Survey.getOptionById(optionId);
      return option;
    } catch (error) {
      console.error('Error fetching survey option:', error);
      throw error;
    }
  }

  static async calculateRecommendation(drinkAnswer, moodAnswer, sleepAnswer) {
    const options = await Survey.getOptionByText([drinkAnswer, moodAnswer, sleepAnswer]);

    const drinkOption = options.find(o => o.option_text === drinkAnswer);
    const moodOption  = options.find(o => o.option_text === moodAnswer);
    const sleepOption = options.find(o => o.option_text === sleepAnswer);

    console.log(drinkOption, moodOption, sleepOption);

    const recommendedWater = drinkOption?.recommendation_value ?? 2200;
    const recommendedSleep = sleepOption?.recommendation_value ?? 8;
    const recommendedMood =  moodOption?.mood_tag ?? 'happy';

    return {
      recommendation: {
        water: recommendedWater,
        sleep: recommendedSleep,
        mood: recommendedMood,
      },
      baseline: {
        water: drinkOption?.numeric_value ?? 2000,
        sleep: sleepOption?.numeric_value ?? 8,
      }
    };
  }
}

export default SurveyService;
