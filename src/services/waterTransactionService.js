import WaterTransaction from "../models/WaterTransaction.js";
const DATE = new Date().toISOString().split('T')[0];

class WaterTransactionService {
  static async storeWaterLog(userId, waterData) {
    try {
      const { amount } = waterData;
      const waterLog = await WaterTransaction.createWaterTransaction(userId, amount, DATE);
      return waterLog;
    } catch (error) {
      console.error('An error occurred while recording your data:', error);
      throw error;
    }
  }
}

export default WaterTransactionService