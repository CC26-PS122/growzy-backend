import supabase from "../config/db.js";

class WaterTransaction {
  static async createWaterTransaction(userId, amount, date) {
    const { data: logData, error: logError } = await supabase
      .from('daily_logs')
      .upsert({ user_id: userId, log_date: date }, { onConflict: 'user_id, log_date' })
      .select()
      .single()

    if (logError) throw logError;

    const { data: waterData, error: waterError } = await supabase
      .from('water_transactions')
      .insert({ daily_log_id: logData.id, amount })
      .select()
      .single()

    if (waterError) throw waterError;

    const { data: totalData, error: totalError } = await supabase
      .from('daily_logs')
      .update({ total_water_ml: logData.total_water_ml + amount })
      .eq('id', logData.id)
      .select()
      .single();

    if (totalError) throw totalError;

    return { totalData, waterData };
  }
}

export default WaterTransaction