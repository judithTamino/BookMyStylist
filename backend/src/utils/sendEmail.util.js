import { generateEmailTemplate } from "./emailTemplate.util.js";
import { transporter } from "../config/nodemailer.js";

export const sendEmail = (appointment, type = "confirmed") => {
  const dateOptione = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
  const mailInfo = {
    user: appointment.user.name,
    date: new Date(appointment.date).toLocaleDateString(dateOptione),
    startTime: appointment.startTime,
    endTime: appointment.endTime,
    service: appointment.service.name,
    notes: appointment.notes ?? "no notes",
    price: appointment.service.price,
    type: type
  }

  const mailOption = {
    from: process.env.ADMIN_EMAIL,
    to: appointment.user.email,
    subject: "Appointment Confirmation",
    html: generateEmailTemplate(mailInfo)
  }

  transporter.sendMail(mailOption, (error, info) => {
    if (error) return false

    return true;
  });
}