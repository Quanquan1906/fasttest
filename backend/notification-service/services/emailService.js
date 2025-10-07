// emailService.js
require("dotenv").config();
const nodemailer = require("nodemailer");

// Tạo transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  });
};

// Gửi email chung
const sendEmail = async (to, subject, text, html) => {
  const transporter = createTransporter();
  try {
    const info = await transporter.sendMail({
      from: `"Food Ordering System" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Error sending email:", err);
    throw err;
  }
};

// Gửi trạng thái order
const sendOrderStatusEmail = async (
  email,
  orderId,
  status,
  deliveryPersonName
) => {
  let subject = "",
    headline = "",
    detail = "";

  switch (status) {
    case "Accepted":
      subject = `Your Order #${orderId.substring(0, 8)} has been accepted`;
      headline = "Your order has been accepted!";
      detail = `${
        deliveryPersonName || "Your delivery person"
      } has accepted your order and will pick it up soon.`;
      break;
    case "Picked Up":
      subject = `Your Order #${orderId.substring(0, 8)} is on the way`;
      headline = "Your order is on the way!";
      detail = `${
        deliveryPersonName || "Your delivery person"
      } has picked up your order and is on the way.`;
      break;
    case "Delivered":
      subject = `Your Order #${orderId.substring(0, 8)} has been delivered`;
      headline = "Your order has been delivered!";
      detail = `${
        deliveryPersonName || "Your delivery person"
      } has delivered your order. Enjoy your meal!`;
      break;
    default:
      subject = `Update on your Order #${orderId.substring(0, 8)}`;
      headline = `Your order status has been updated to ${status}`;
      detail = "Check the app for more details.";
  }

  const text = `${headline}\n\n${detail}\n\nOrder ID: ${orderId}\nStatus: ${status}\n\nThank you for using our system!`;
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color:#e53935;">${headline}</h2>
      <p>${detail}</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Status:</strong> ${status}</p>
      <hr/>
      <p>Thank you for using our Food Ordering System!</p>
    </div>
  `;

  return await sendEmail(email, subject, text, html);
};

module.exports = { sendEmail, sendOrderStatusEmail };
