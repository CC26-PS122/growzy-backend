import WaterTransactionService from "../services/waterTransactionService.js";

export const postWaterLog = async (req, res) => {
  try {
    const waterData = req.body;
    const userId = req.user?.auth_id;

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in token' });
    }

    const data = await WaterTransactionService.storeWaterLog(userId, waterData);
    res.status(200).json({
      data,
      message: 'Your water log has been successfully recorded.'
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to process water log", error: error.message });
  }
}