import { Router } from "express";
import ownerRouter from "./business-owner.route.js";
import employeeRouter from "./business-employee.route.js";

const customerRouter = Router();

customerRouter.use("/dealer", ownerRouter);
customerRouter.use("/employee", employeeRouter);

export default customerRouter;
