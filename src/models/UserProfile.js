import supabase from '../config/db.js';

class UserProfile {
  static async createUserProfile(userId, userData) {
    try {
      const { baseline_sleep_hours, baseline_water_ml, daily_sleep_target, daily_water_target } = userData;
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: userId,
          baseline_sleep_hours: baseline_sleep_hours,
          baseline_water_ml: baseline_water_ml,
          daily_sleep_target: daily_sleep_target,
          daily_water_target: daily_water_target,
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
      console.error('Error creating your profile', error);
      throw error;
    }
  }

  static async updateUserProfileByUserId(userId, userData) {
    if (!userId) {
      throw new Error('User ID is required to update your profile')
    }

    try {
      const {data, error} = await supabase
        .from('user_profiles')
        .update(userData)
        .eq('user_id', userId);

      if (error) throw error

      return data;
    } catch (error) {
      console.error('Error updating your profile', error);
      throw error;
    }
  }

  static async getUserProfileByUserId(userId) {
    if (!userId) {
      throw new Error('User ID is required to fetch your profile')
    }
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error fetching your profile', error);
      throw error;
    }
  }
}

export default UserProfile;