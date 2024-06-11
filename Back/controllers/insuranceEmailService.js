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

function generateInsuranceId() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  }
  
  async function sendInsuranceConfirmationEmail(email, totalPrice, insuranceId, offerName) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Insurance Payment Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="text-align: center; color: #4CAF50;">Thank you for your insurance payment!</h2>
          <p>Dear valued customer,</p>
          <p>We are pleased to confirm your insurance payment for the offer: <strong>${offerName}</strong>. Here are the details of your transaction:</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Item</th>
              <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Price</th>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;">Insurance Payment</td>
              <td style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">$${totalPrice}</td>
            </tr>
          </table>
          <p style="text-align: center; margin-top: 20px;">Your insurance ID is: <strong>${insuranceId}</strong></p>
          <p style="text-align: center;">Your payment has been successfully processed.</p>
          <p style="text-align: center;">If you have any questions, please contact our support team.</p>
          <p style="text-align: center; color: #555;">Thank you for choosing our insurance services!</p>
          <p style="text-align: center; font-size: 12px; color: #aaa;">&copy; 2024 PetPulse</p>
        </div>
      `
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log('Insurance confirmation email sent successfully');
    } catch (error) {
      console.error('Error sending insurance confirmation email:', error);
    }
  }
  
  module.exports = { sendInsuranceConfirmationEmail, generateInsuranceId };