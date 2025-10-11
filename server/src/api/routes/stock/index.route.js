import { Router } from "express";
import categoryRouter from "./category.route.js";
import subcategoryRouter from "./subcategory.route.js";
import productRouter from "./product.route.js";

const stockRouter = Router();

stockRouter.use("/category", categoryRouter);
stockRouter.use("/subcategory", subcategoryRouter);
stockRouter.use("/product", productRouter);

export default stockRouter;
