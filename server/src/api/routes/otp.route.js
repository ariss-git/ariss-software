import { sendOTPController } from "../controllers/otp.controller.js";
import { Router } from "express";

const otpRouter = Router();

otpRouter.post("/", sendOTPController);

export default otpRouter;
