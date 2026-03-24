import dailyLogService from "../services/dailyLogService.js";

export const postDailyLog = async (req, res) => {
  try {
    const logData = req.body;
    const userId = req.user?.auth_id;

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in token' });
    }

    const logResult = await dailyLogService.storeDailyLog(userId, logData);
    res.status(201).json({
      data: logResult,
      message: 'Your daily data has been successfully recorded.'
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process daily log.', error: error.message });
  }
};