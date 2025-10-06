import { Router } from "express";
import * as panelUserControllers from "../controllers/panel-user.controller";

const panelUserRouter = Router();

panelUserRouter.post("/create", panelUserControllers.createPanelUserController);

panelUserRouter.get("/admin", panelUserControllers.fetchAllAdminsController);
panelUserRouter.get(
  "/employee",
  panelUserControllers.fetchAllEmployeesController
);

panelUserRouter.delete(
  "/delete/:id",
  panelUserControllers.deletePanelUserController
);

export default panelUserRouter;
