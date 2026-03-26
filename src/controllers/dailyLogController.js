import dailyLogService from "../services/dailyLogService.js";

export const getDailyLogs = async (req, res) => {
  try {
    const userId = req.user?.auth_id;
    const data = await dailyLogService.getAllDailyLogsByUserId(userId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const postDailyLog = async (req, res) => {
  try {
    const logData = req.body;
    const userId = req.user?.auth_id;

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in token' });
    }

    const data = await dailyLogService.storeDailyLog(userId, logData);
    res.status(201).json({
      data,
      message: 'Your daily data has been successfully recorded.'
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process daily log.', error: error.message });
  }
};

export const postSleepLog = async (req, res) => {
  try {
    const logData = req.body;
    const userId = req.user?.auth_id;

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in token' });
    }

    const data = await dailyLogService.storeSleepLog(userId, logData);
    res.status(201).json({
      data,
      message: 'Your daily data has been successfully recorded.'
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to process sleep log", error: error.message });
  }
};

export const postMoodLog = async (req, res) => {
  try {
    const logData = req.body;
    const userId = req.user?.auth_id;

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in token' });
    }

    const data = await dailyLogService.storeMoodLog(userId, logData);
    res.status(201).json({
      data,
      message: 'Your daily data has been successfully recorded.'
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process daily log.', error: error.message });
  }
};