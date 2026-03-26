import DailyLog from "../models/DailyLog.js";
const DATE = new Date().toISOString().split('T')[0];

class dailyLogService {
  static convertTimeJsonToMinutes(time) {
    const [hour, minutes] = time.split(':').map(Number)
    const total = (hour * 60) + minutes;
    return total
  }

  static async getAllDailyLogsByUserId(userId) {
    try {
      const dailyLogs = await DailyLog.getDailyLogsByUserId(userId);
      return dailyLogs;
    } catch (error) {
      console.error('Error fetching daily logs:', error);
      throw error;
    }
  }

  static async storeDailyLog(userId, logData) {
    try {
      const dailyLog = await DailyLog.createDailyLog(userId, logData, DATE)
      return dailyLog
    } catch (error) {
      console.error('An error occurred while recording your data:', error);
      throw error;
    }
  }

  static async storeSleepLog(userId, logData) {
    try {
      let { sleep_start, sleep_end, total_sleep_minutes } = logData;

      const startMinutes = this.convertTimeJsonToMinutes(sleep_start);
      const endMinutes = this.convertTimeJsonToMinutes(sleep_end);

      if (!total_sleep_minutes) {
        total_sleep_minutes = endMinutes - startMinutes;
        if (total_sleep_minutes < 0) {
          total_sleep_minutes += 24 * 60;
        }
      }

      const dailyLog = await DailyLog.createSleepLog(userId, { total_sleep_minutes, sleep_end, sleep_start }, DATE);
      return dailyLog
    } catch (error) {
      console.error('An error occurred while recording your data:', error);
      throw error;
    }
  }

  static async storeMoodLog(userId, logData) {
    try {
      const dailyLog = await DailyLog.createMoodLog(userId, logData, DATE);
      return dailyLog
    } catch (error) {
      console.error('An error occurred while recording your data:', error);
      throw error;
    }
  }
}

export default dailyLogService;