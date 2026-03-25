import supabase from '../config/db.js';

class DailyLog {
  static async createDailyLog(userId, logData, date) {
    const { sleep_start, sleep_end, total_sleep_minutes, total_water_ml, mood_id, mood_note } = logData;
    const { data, error } = await supabase
      .from('daily_logs')
      .insert({
        user_id: userId,
        log_date: date,
        sleep_start,
        sleep_end,
        total_sleep_minutes,
        total_water_ml,
        mood_id,
        mood_note,
      })
      .select();

    if (error) throw error;
    return data;
  }

  static async createSleepLog(userId, logData, date) {
    const { sleep_start, sleep_end, total_sleep_minutes } = logData;
    const { data, error } = await supabase
      .from('daily_logs')
      .upsert({
        user_id: userId,
        log_date: date,
        sleep_start,
        sleep_end,
        total_sleep_minutes,
      }, {
        onConflict: 'user_id, log_date'
      })
      .select()
      .maybeSingle();

    if (error) throw error;
    return data;
  }
}

export default DailyLog;