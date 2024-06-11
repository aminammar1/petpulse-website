require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendConfirmationEmail(email, totalPrice, deviceId) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Purchase Confirmation",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="text-align: center; color: #4CAF50;">Thank you for your purchase!</h2>
      <p>Dear valued customer,</p>
      <p>We are pleased to confirm your purchase. Here are the details of your order:</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Item</th>
          <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Price</th>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">Your Purchase</td>
          <td style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">$${totalPrice}</td>
        </tr>
      </table>
      <p style="text-align: center; margin-top: 20px;">Your order has been successfully processed.</p>
      <p style="text-align: center;">Your device ID is: <strong>${deviceId}</strong></p>
      <p style="text-align: center;">If you have any questions, please contact our support team.</p>
      <p style="text-align: center; color: #555;">Thank you for shopping with us!</p>
      <p style="text-align: center; font-size: 12px; color: #aaa;">&copy; Petpulse</p>
    </div>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}

module.exports = { sendConfirmationEmail };
