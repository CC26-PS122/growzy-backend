import supabase from '../config/db.js';

export const createUserCharacter = async (userId, userData) => {
  if (!userId) {
    throw new Error('User ID is required to fetch your character')
  }

  try {
    const { name, current_mood_state } = userData;
    const { data, error } = await supabase
      .from('characters')
      .upsert({
        user_id: userId,
        name,
        current_mood_state,
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
};

export const getCharacterByUserId = async (userId) => {
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