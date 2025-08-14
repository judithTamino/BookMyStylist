import { generateTimeSlots } from "../utils/timeSlots.utils.js";

// calculate the end time based on service duration 
export const calculateEndTime = (serviceDuration, startTime) => {
  const [hour, minute] = startTime.split(":").map(Number);
  const appointmentDuration = hour * 60 + minute + serviceDuration;

  const endHours = Math.floor(appointmentDuration / 60);
  const endMinutes = appointmentDuration % 60;

  return `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
}

// check if appointment is between working hours
export const isTimeSoltBetweenWorkingHoures = (startTime, endTime, date) => {
  const timeSlots = generateTimeSlots(date);
  const openingHours = timeSlots[0];
  const closingHours = timeSlots[timeSlots.length - 1];

  if (startTime < openingHours || endTime > closingHours)
    return false;

  return true;
}


