import * as discountControllers from "../controllers/discount.controller.js";
import { Router } from "express";

const discountRouter = Router();

discountRouter.post("/assign", discountControllers.assignDiscountController);

discountRouter.get("/all", discountControllers.fetchAllDiscountsController);
discountRouter.get("/:id", discountControllers.fetchSingleDiscountController);

discountRouter.delete(
  "/delete/:id/:panelId",
  discountControllers.deleteDiscountController
);

export default discountRouter;
