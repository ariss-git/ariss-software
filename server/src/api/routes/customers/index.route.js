import { Router } from "express";
import ownerRouter from "./business-owner.route.js";

const customerRouter = Router();

customerRouter.use("/dealer", ownerRouter);

export default customerRouter;
