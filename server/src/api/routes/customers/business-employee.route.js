import { Router } from "express";
import * as employeeControllers from "../../controllers/customers/business-employee.controller.js";

const employeeRouter = Router();

employeeRouter.post(
  "/register",
  employeeControllers.registerEmployeeController
);

employeeRouter.get(
  "/technician/all",
  employeeControllers.getAllTechniciansController
);
employeeRouter.get(
  "/backoffice/all",
  employeeControllers.getAllBackofficeController
);

export default employeeRouter;
