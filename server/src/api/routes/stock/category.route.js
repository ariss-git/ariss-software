import { Router } from "express";
import * as categoryControllers from "../../controllers/stock/category.controller.js";

const categoryRouter = Router();

categoryRouter.post("/add", categoryControllers.addCategoryController);

categoryRouter.get("/all", categoryControllers.getAllCategoryController);
categoryRouter.get("/:id", categoryControllers.getSingleCategoryController);

categoryRouter.put("/update/:id", categoryControllers.updateCategoryController);

categoryRouter.delete(
  "/delete/:id/:panelId",
  categoryControllers.updateCategoryController
);

export default categoryRouter;
