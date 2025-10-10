import crypto from "crypto";
import emailTransporter from "../../utils/email-transporter.js";
import prisma from "../../lib/orm.js";

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
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  // upsert ensures only one OTP per email
  await prisma.oTP.upsert({
    where: { email },
    update: { code: otp, expires_at: expiresAt },
    create: { email, code: otp, expires_at: expiresAt },
  });
};

export const verifyOTP = async (email, otp) => {
  const record = await prisma.oTP.findUnique({ where: { email } });
  if (!record) return false;

  const expired = record.expires_at < new Date();
  if (expired || record.code !== otp) return false;

  await prisma.oTP.delete({ where: { email } });
  return true;
};

export const wipeOTP = async () => {
  return await prisma.oTP.deleteMany();
};
