const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = (
  to,
  name,
  serviceType,
  date,
  status = "accepted",
  billing = {}
) => {
  const subject = status === "completed" ? "Service Completed" : "Booking Confirmation";

  const message =
    status === "completed"
      ? `<p>Your <strong>${serviceType}</strong> service on <strong>${date}</strong> is completed.</p>
      <p>Please collect your Vehicle from service center.</p>`
      : `<p>Your booking for <strong>${serviceType}</strong> on <strong>${date}</strong> is confirmed.</p>
      <p>Please submit Vehicle in-time to service center.</p>`;

  const billDetails =
    status === "completed" && billing
      ? `
      <h3>Bill Summary</h3>
      <table style="border-collapse:collapse;line-height:1.6">
        <tr><td>Base Price:</td><td>₹${billing.basePrice}</td></tr>
        <tr><td>GST (18%):</td><td>₹${billing.gst}</td></tr>
        <tr><td>Service Tax (5%):</td><td>₹${billing.serviceTax}</td></tr>
        <tr><td><strong>Total Amount:</strong></td><td><strong>₹${billing.finalAmount}</strong></td></tr>
      </table>
    `
      : "";

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: `
      <h2>Hi ${name},</h2>
      ${message}
      ${billDetails}
      <br/>
      <p>Regards,<br/>Honda Service Team</p>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendConfirmationEmail };