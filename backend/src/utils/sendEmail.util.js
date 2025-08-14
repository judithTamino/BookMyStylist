import { generateEmailTemplate } from "./emailTemplate.util.js";
import { transporter } from "../config/nodemailer.js";

export async function sendEmail (appointment, userName, serviceName, servicePrice, userEmail, type = "confirmed") {
  const dateOptione = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
  const mailInfo = {
    user: userName,
    date: new Date(appointment.date).toLocaleDateString(dateOptione),
    startTime: appointment.startTime,
    endTime: appointment.endTime,
    service: serviceName,
    notes: appointment.notes ?? "no notes",
    price: servicePrice,
    type: type
  }

  const mailOption = {
    from: process.env.ADMIN_EMAIL,
    to: userEmail,
    subject: type === "confirmed" ? "Appointment Confirmation" : "Appointment Cancelled",
    html: generateEmailTemplate(mailInfo)
  }

  transporter.sendMail(mailOption, (error, info) => {
    if (error) return false
    return true;
  });
}