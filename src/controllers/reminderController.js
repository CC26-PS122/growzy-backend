import { runReminderJob } from "../jobs/reminderJob.js";

export const handleReminderJob = async (req, res) => {
  const cronSecret = req.headers['authorization'];
  if (cronSecret !== `Bearer ${process.env.CRON_SECRET}`) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    await runReminderJob();
    res.status(200).json({
      success: true,
      message: "Reminder job executed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to execute reminder job",
      error: error.message
    });
  }
}