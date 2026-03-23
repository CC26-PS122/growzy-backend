import supabase from '../config/db.js';

class Character {
  static async createUserCharacter(userId, userData) {
    try {
      const { name, current_mood_state } = userData;
      const { data, error } = await supabase
        .from('characters')
        .upsert({
          user_id: userId,
          name: name,
          current_mood_state: current_mood_state,
          last_updated: new Date().toISOString(),
        },
          { onConflict: 'user_id' }
        )
        .select()
        .maybeSingle();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error creating your character', error);
      throw error;
    }
  }

  static async getCharacterByUserId(userId) {
    if (!userId) {
      throw new Error('User ID is required to fetch your character')
    }
    try {
      const { data, error } = await supabase
        .from('characters')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching your character', error);
      throw error;
    }
  }
}

export default Character;