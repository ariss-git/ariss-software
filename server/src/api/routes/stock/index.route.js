import { Router } from "express";
import categoryRouter from "./category.route.js";
import subcategoryRouter from "./subcategory.route.js";

const stockRouter = Router();

stockRouter.use("/category", categoryRouter);
stockRouter.use("/subcategory", subcategoryRouter);

export default stockRouter;
