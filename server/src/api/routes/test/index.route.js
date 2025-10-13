import { Router } from "express";
import courseRouter from "./course.route.js";

const testRouter = Router();

testRouter.use("/course", courseRouter);

export default testRouter;
