import { Router } from "express";
import * as notificationControllers from "../controllers/notification.controller.js";

const notificationRouter = Router();

notificationRouter.get(
  "/all",
  notificationControllers.fetchAllNotificationsController
);
notificationRouter.get(
  "/read",
  notificationControllers.fetchAllReadNotificationsController
);
notificationRouter.get(
  "/unread",
  notificationControllers.fetchAllUnreadNotificationsController
);

notificationRouter.patch(
  "/read/:id",
  notificationControllers.readNotificationController
);

export default notificationRouter;
