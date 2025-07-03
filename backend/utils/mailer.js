import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const notifyAdmin = async (newUser) => {
  try {
    await transporter.sendMail({
      from: `"Task Manager" <${process.env.EMAIL_USER}>`,
      to: "admin@gmail.com", // Replace with actual admin email
      subject: "🔔 New User Registered",
      html: `<p><strong>${newUser.name}</strong> just registered with email: ${newUser.email}</p>`,
    });
    console.log("📧 Email:", process.env.EMAIL_USER);
    console.log(
      "🔒 Pass:",
      process.env.EMAIL_PASS ? "✔️ Loaded" : "❌ Missing"
    );

    console.log("📧 Admin notified via email.");
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
  }
};
