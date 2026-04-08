import { getDailyLogsByUserId, updateDailyActivity } from "../services/dailyLogService.js";

export const handleUpdateLog = async (req, res) => {
  try {
    const userId = req.user.auth_id;
    const logData = req.body;
    console.log(userId)
    const result = await updateDailyActivity(userId, logData);

    res.status(200).json({
      success: true,
      message: "Daily log updated successfully!",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update daily log",
      error: error.message
    });
  }
}

export const getDailyLogs = async (req, res) => {
  try {
    const userId = req.user.auth_id;
    const result = await getDailyLogsByUserId(userId);

    res.status(200).json({
      success: true,
      message: "Daily logs fetched successfully!",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch daily logs",
      error: error.message
    });
  }
}