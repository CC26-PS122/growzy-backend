import supabase from '../config/db.js';
import { convertTimeToMinutes } from '../helpers/timeHelper.js';

export const updateDailyActivity = async (userId, dailyLog) => {
  const date = dailyLog.date ?? new Date().toISOString().split('T')[0];

  const { data: logData, error: logError } = await supabase
    .from('daily_logs')
    .upsert({ user_id: userId, log_date: date }, { onConflict: 'user_id, log_date' })
    .select()
    .single()

  if (logError) throw logError;

  let sleepData = null;
  let moodData = null;
  let waterResult = null;

  if (dailyLog.sleep_start || dailyLog.sleep_end || dailyLog.total_sleep_minutes) {
    let { sleep_start, sleep_end, total_sleep_minutes } = dailyLog;

    const startMinutes = convertTimeToMinutes(sleep_start);
    const endMinutes = convertTimeToMinutes(sleep_end);

    if (sleep_start && sleep_end && !total_sleep_minutes) {
      total_sleep_minutes = endMinutes - startMinutes;
      if (total_sleep_minutes < 0) {
        total_sleep_minutes += 24 * 60;
      }
    }

    const { data, error } = await supabase
      .from('daily_logs')
      .upsert({
        user_id: userId,
        log_date: date,
        sleep_start,
        sleep_end,
        total_sleep_minutes,
      }, { onConflict: 'user_id, log_date' })
      .select()
      .single();

    if (error) throw error;
    sleepData = data;
  }


  if (dailyLog.mood_id || dailyLog.mood_note) {
    const { data, error } = await supabase
      .from('daily_logs')
      .upsert({
        user_id: userId,
        log_date: date,
        mood_id: dailyLog.mood_id,
        mood_note: dailyLog.mood_note,
      }, { onConflict: 'user_id, log_date' })
      .select()
      .single();

    if (error) throw error;
    moodData = data;
  }

  if (dailyLog.amount) {
    const { data: waterData, error: waterError } = await supabase
      .from('water_transactions')
      .insert({ daily_log_id: logData.id, amount: dailyLog.amount })
      .select()
      .single()

    if (waterError) throw waterError;

    const { data: totalData, error: totalError } = await supabase
      .from('daily_logs')
      .update({ total_water_ml: logData.total_water_ml + dailyLog.amount })
      .eq('id', logData.id)
      .select()
      .single();

    if (totalError) throw totalError;
    waterResult = { waterData, totalData };
  }

  return { sleepData, moodData, waterResult };
}

export const getDailyLogsByUserId = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required to fetch your daily logs')
  }

  try {
    const { data, error } = await supabase
      .from('daily_logs')
      .select(`
        id,
        user_id,
        log_date,
        sleep_start,
        sleep_end,
        total_sleep_minutes,
        total_water_ml,
        mood_note,
        mood_types (
          id,
          mood_name,
          default_expression_asset
        ),
        water_transactions (
          amount
        )
      `)
      .eq('user_id', userId)
      .order('log_date', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching logs for user ${userId}:`, error);
    throw error;
  }
}