import nodemailer from "nodemailer";

export const sendMail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // must not be undefined
      pass: process.env.EMAIL_PASS, // must not be undefined
    },
  });
  console.log("EMAIL_USER =", process.env.EMAIL_USER);
  console.log("EMAIL_PASS =", process.env.EMAIL_PASS);

  try {
    await transporter.sendMail({
      from: `"Task Manager" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};
