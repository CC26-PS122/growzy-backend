import supabase from '../config/db.js';

class Survey {
  static async getQuestions() {
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
  }

  static async getOptionByText(answers) {
    const { data, error } = await supabase
      .from('survey_options')
      .select(`option_text, numeric_value, mood_tag, recommendation_value`)
      .in('option_text', answers);

    if (error) throw error;
    return data;
  }
}

export default Survey;