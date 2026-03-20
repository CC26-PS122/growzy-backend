import supabase from '../config/db.js';

class UserProfile {
  static async createUserProfile(userData) {
    const { baselineSleepHours, baselineWaterMl, dailySleepTarget, dailyWaterTarget, } = userData;
    const userId = req.user.auth_id
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert([
        {
          user_id: userId,
          baseline_sleep_hours: baselineSleepHours,
          baseline_water_ml: baselineWaterMl,
          daily_sleep_target: dailySleepTarget,
          daily_water_target: dailyWaterTarget,
        }
      ]);

    if (error) {
      throw new Error(error.message);
    } else {
      return data;
    }
  }

  static async getUserProfileByUserId(userId) {
    if (!userId) {
      throw new Error('User ID is required to fetch user profile')
    }
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching profile by user ID', error);
      throw error;
    }

  }


}

export default UserProfile;