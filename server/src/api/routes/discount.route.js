import * as discountControllers from "../controllers/discount.controller.js";
import { Router } from "express";

const discountRouter = Router();

discountRouter.post("/assign", discountControllers.assignDiscountController);

export default discountRouter;
