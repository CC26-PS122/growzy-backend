import supabase from '../config/db.js';

export const createUserProfile = async (userId, userData) => {
  if (!userId) {
    throw new Error('User ID is required to create a profile')
  }

  try {
    const { baseline_sleep_hours, baseline_water_ml, daily_sleep_target, daily_water_target } = userData;
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        baseline_sleep_hours,
        baseline_water_ml,
        daily_sleep_target,
        daily_water_target,
      },
        { onConflict: 'user_id' }
      )
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating your profile', error);
    throw error;
  }
}

export const updateUserProfileByUserId = async (userId, userData) => {
  if (!userId) {
    throw new Error('User ID is required to update your profile')
  }

  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(userData)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error

    return data;
  } catch (error) {
    console.error('Error updating your profile', error);
    throw error;
  }
}

export const getUserProfileByUserId = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required to fetch your profile')
  }
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error fetching your profile', error);
    throw error;
  }
}