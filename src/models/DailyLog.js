import supabase from '../config/db.js';

class DailyLog {
  static async createDailyLog(userId, logData) {
    const { log_date, sleep_start, sleep_end, total_sleep_minutes, total_water_ml, mood_id, mood_note } = logData;
    const { data, error } = await supabase
      .from('daily_logs')
      .insert({
        user_id: userId,
        log_date: log_date,
        sleep_start: sleep_start,
        sleep_end: sleep_end,
        total_sleep_minutes: total_sleep_minutes,
        total_water_ml: total_water_ml,
        mood_id: mood_id,
        mood_note: mood_note,
      })
      .select();

    if (error) throw error;
    return data;
  }
}

export default DailyLog;