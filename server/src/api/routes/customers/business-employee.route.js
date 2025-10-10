import { Router } from "express";
import * as employeeControllers from "../../controllers/customers/business-employee.controller.js";

const employeeRouter = Router();

employeeRouter.post(
  "/register",
  employeeControllers.registerEmployeeController
);

export default employeeRouter;
