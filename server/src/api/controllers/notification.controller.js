import { NotificationService } from "../services/notification.service.js";

const notificationServices = new NotificationService();

export const fetchAllNotificationsController = async (_req, res) => {
  try {
    const notification = await notificationServices.fetchAllNotifications();
    res.status(200).json({ total: notification.length, data: notification });
  } catch (error) {
    console.log("Error fetching all notifications");
    res.status(500).json({ message: error.message });
  }
};

export const fetchAllReadNotificationsController = async (_req, res) => {
  try {
    const notification = await notificationServices.fetchAllReadNotifications();
    res.status(200).json({ total: notification.length, data: notification });
  } catch (error) {
    console.log("Error fetching all read notifications");
    res.status(500).json({ message: error.message });
  }
};

export const fetchAllUnreadNotificationsController = async (_req, res) => {
  try {
    const notification =
      await notificationServices.fetchAllUnreadReadNotifications();
    res.status(200).json({ total: notification.length, data: notification });
  } catch (error) {
    console.log("Error fetching all unread notifications");
    res.status(500).json({ message: error.message });
  }
};

export const readNotificationController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    console.log("Notification ID not found in params");
    return res
      .status(404)
      .json({ message: "Notification ID not found in params" });
  }

  try {
    const notification = await notificationServices.readNotification(id);
    res
      .status(200)
      .json({ message: "Notification updated", data: notification });
  } catch (error) {
    console.log("Failed to read the notification");
    res.status(400).json({ message: error.message });
  }
};
