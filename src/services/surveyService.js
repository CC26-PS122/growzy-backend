import supabase from '../config/db.js';

export const getQuestions = async () => {
  try {
    const { data, error } = await supabase
      .from('survey_questions')
      .select(`
        id,
        question_text,
        order_priority,
        survey_options (
          id,
          option_text,
          numeric_value,
          mood_tag
        )
      `)
      .order('order_priority', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching survey questions:', error);
    throw error;
  }
};

const getOptionByText = async (answers) => {
  try {
    const { data, error } = await supabase
      .from('survey_options')
      .select(`option_text, numeric_value, mood_tag, recommendation_value`)
      .in('option_text', answers);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching survey option by text:', error);
    throw error;
  }
};

export const calculateRecommendation = async (drinkAnswer, moodAnswer, sleepAnswer) => {
  const options = await getOptionByText([drinkAnswer, moodAnswer, sleepAnswer]);

  const drinkOption = options.find(o => o.option_text === drinkAnswer);
  const moodOption = options.find(o => o.option_text === moodAnswer);
  const sleepOption = options.find(o => o.option_text === sleepAnswer);

  return {
    recommendation: {
      water: drinkOption?.recommendation_value ?? 2200,
      sleep: sleepOption?.recommendation_value ?? 8,
      mood: moodOption?.mood_tag ?? 'happy',
    },
    baseline: {
      water: drinkOption?.numeric_value ?? 2000,
      sleep: sleepOption?.numeric_value ?? 8,
    }
  };
}