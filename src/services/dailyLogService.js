import DailyLog from "../models/DailyLog.js";

class dailyLogService {
  static async storeDailyLog(userId, logData) {
    try {
      const dailyLog = await DailyLog.createDailyLog(userId, logData)
      console.log(dailyLog);
      return dailyLog
    } catch (error) {
      console.error('An error occurred while recording your data.:', error);
      throw error;
    }
  }
}

export default dailyLogService;