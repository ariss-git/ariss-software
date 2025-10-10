import * as otpServices from "../services/otp.service.js";

export const sendOTPController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(404);
    throw new Error("Email not found");
  }

  try {
    const otp = otpServices.generateOTP();
    await otpServices.storeOTP(email, otp);
    await otpServices.sendOTP(email, otp);

    res.status(200).json({
      message: `OTP sent on email - ${email}`,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to send OTP");
  }
};
