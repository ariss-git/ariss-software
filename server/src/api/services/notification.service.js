import prisma from "../../lib/orm.js";
import { v4 as uuid } from "uuid";

export const createNotification = async (title, description, author) => {
  const existingNotification = await prisma.notification.findUnique({
    where: {
      id,
    },
  });

  if (existingNotification) throw new Error("Notification already exist");

  return await prisma.notification.create({
    data: {
      id: `notification-${uuid()}`,
      title,
      description,
      author,
    },
  });
};

export class NotificationService {
  async fetchAllNotifications() {
    return await prisma.notification.findMany();
  }

  async fetchAllReadNotifications() {
    return await prisma.notification.findMany({
      where: {
        is_read: true,
      },
    });
  }

  async fetchAllUnreadReadNotifications() {
    return await prisma.notification.findMany({
      where: {
        is_read: false,
      },
    });
  }

  async readNotificatin(id) {
    const existingNotification = await prisma.notification.findUnique({
      where: {
        id,
      },
    });

    if (!existingNotification) throw new Error("Notification do not exist");

    return await prisma.notification.update({
      where: {
        id,
      },
      data: {
        is_read: true,
      },
    });
  }
}
