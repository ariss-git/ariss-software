import { wipeOTP } from "../api/services/otp.service.js";
import cron from "node-cron";

cron.schedule("0 0 * * *", async () => {
  try {
    const deleted = await wipeOTP();
    console.log(`OTP deleted today: ${deleted.count}`);
  } catch (error) {
    console.error("Failed wiping otp");
  }
});
