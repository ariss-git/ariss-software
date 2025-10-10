import emailTransporter from "../utils/email-transporter.js";

export const waitForApproval = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Account is Under Review",
    text: "Please wait while your account is being reviewed by ARISS.",
  };

  await emailTransporter.sendMail(mailOptions);
};
