import { Router } from "express";
import categoryRouter from "./category.route.js";

const stockRouter = Router();

stockRouter.use("/category", categoryRouter);

export default stockRouter;
