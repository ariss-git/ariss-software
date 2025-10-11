import { Router } from "express";
import panelUserRouter from "./panel-user.route.js";
import notificationRouter from "./notification.route.js";
import otpRouter from "./otp.route.js";
import customerRouter from "./customers/index.route.js";
import stockRouter from "./stock/index.route.js";

const mainRouter = Router();

mainRouter.use("/panel-user", panelUserRouter);
mainRouter.use("/notification", notificationRouter);
mainRouter.use("/otp", otpRouter);
mainRouter.use("/customer", customerRouter);
mainRouter.use("/stock", stockRouter);

export default mainRouter;
