import { getWorkingDay } from "../helpers/appointment.helper.js";
import User from "../models/User.model.js";

// generate time slots based on admin working hours
export const generateTimeSlots = async (appointmentDate) => {
  const slots = [];
  const currentDate = new Date();
  appointmentDate = new Date(appointmentDate);
  
  // find working hours for that day
  const workingDay = await getWorkingDay(appointmentDate);
  if (!workingDay) return [];

  // check if the appointment date is today
  if (appointmentDate.toDateString() === currentDate.toDateString()) return [];

  const [startHour, startMinute] = workingDay.startTime.split(":").map(Number);
  const [endHour] = workingDay.endTime.split(":").map(Number);

  for (let hour = startHour; hour < endHour; hour++)
    for (let minute = startMinute; minute < 60; minute += 15)
      slots.push(`${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`);

  return slots;
}

