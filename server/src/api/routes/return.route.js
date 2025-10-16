import * as returnControllers from "../controllers/return.controller.js";
import { Router } from "express";

const returnRouter = Router();

returnRouter.post("/create", returnControllers.createReturnRequestController);

returnRouter.get("/all", returnControllers.fetchAllReturnsController);
returnRouter.get("/", returnControllers.getAllReturnController);

returnRouter.patch(
  "/approve/:id",
  returnControllers.approveReturnRequestController
);
returnRouter.patch(
  "/reject/:id",
  returnControllers.rejectReturnRequestController
);

returnRouter.delete(
  "/delete/:id",
  returnControllers.deleteReturnRequestController
);

export default returnRouter;
