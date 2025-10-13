import { Router } from "express";
import panelUserRouter from "./panel-user.route.js";
import notificationRouter from "./notification.route.js";
import otpRouter from "./otp.route.js";
import customerRouter from "./customers/index.route.js";
import stockRouter from "./stock/index.route.js";
import discountRouter from "./discount.route.js";
import testRouter from "./test/index.route.js";

const mainRouter = Router();

mainRouter.use("/panel-user", panelUserRouter);
mainRouter.use("/notification", notificationRouter);
mainRouter.use("/otp", otpRouter);
mainRouter.use("/customer", customerRouter);
mainRouter.use("/stock", stockRouter);
mainRouter.use("/discount", discountRouter);
mainRouter.use("/test", testRouter);

export default mainRouter;
