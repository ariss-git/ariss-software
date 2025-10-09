import { Router } from "express";
import panelUserRouter from "./panel-user.route.js";
import notificationRouter from "./notification.route.js";

const mainRouter = Router();

mainRouter.use("/panel-user", panelUserRouter);
mainRouter.use("/notification", notificationRouter);

export default mainRouter;
