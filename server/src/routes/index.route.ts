import { Router } from "express";
import panelUserRouter from "./panel-user.route";

const mainRouter = Router();

mainRouter.use("/panel-user", panelUserRouter);

export default mainRouter;
