import { Router } from "express";
import panelUserRouter from "./panel-user.route";

const mainRouter = Router();

panelUserRouter.use("/panel-user");

export default mainRouter;
