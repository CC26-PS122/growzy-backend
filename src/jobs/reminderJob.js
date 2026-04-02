import supabase from "../config/db.js";

export const runReminderJob = async () => {
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:00`

  const { data: users, error } = await supabase
    .from('user_profiles')
    .select('user_id, reminder_time')
    .eq('reminder_time', currentTime);

  if (error) {
    console.error("Reminder job error:", error);
    return;
  }

  if (!users || users.length === 0) {
    return
  }

  const notifications = users.map(user => ({
    user_id: user.user_id,
    message: 'Jangan lupa catat aktivitas harianmu hari ini!',
    type: 'daily_reminder',
    is_read: false,
  }));

  const { error: notificationError } = await supabase
    .from('notifications')
    .insert(notifications);

  if (notificationError) {
    console.error('Failed to insert notifications', notificationError)
  }

  console.log(`Reminder sent to ${users.length} users at ${currentTime}`);
}