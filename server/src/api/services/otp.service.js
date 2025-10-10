import crypto from "crypto";
import redisClient from "../../utils/redis-client.js";
import emailTransporter from "../../utils/email-transporter.js";

export const generateOTP = () => crypto.randomInt(100000, 999999).toString();

export const sendOTP = async (email, otp) => {
  const mailOption = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}. It expires in 5 minutes.`,
  };

  await emailTransporter.sendMail(mailOption);
};

export const storeOTP = async (email, otp) => {
  await redisClient.setEx(`otp:${email}`, OTP_EXPIRATION, otp);
};

export const verifyOTP = async (email, otp) => {
  const storedOTP = await redisClient.get(`otp:${email}`);
  if (!storedOTP || storedOTP !== otp) return false;

  await redisClient.del(`otp:${email}`);
  return true;
};
