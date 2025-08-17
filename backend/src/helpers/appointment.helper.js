import User from "../models/User.model.js";

export const convertToMinutes = time => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

export const getWorkingDay = async (date) => {
  // get the admin
  const admin = await User.findOne({ isAdmin: true }).lean();

  // there is no admin or admin doesn't have working hours
  if (!admin || admin.workingHoures.length === 0) return null;

  // get the day for the appointment date
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const appointmentDay = days[date.getDay()];

  // find working hours for that day
  const workingDay = admin.workingHoures.find(d => d.day === appointmentDay);
  return workingDay || null;
}

// calculate the end time based on service duration 
export const calculateEndTime = (serviceDuration, startTime) => {
  const appointmentDuration = convertToMinutes(startTime) + serviceDuration;

  const endHours = Math.floor(appointmentDuration / 60);
  const endMinutes = appointmentDuration % 60;

  return `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
}

// check if appointment is between working hours
export const isTimeSoltBetweenWorkingHoures = async (startTime, endTime, date) => {
  const workingDay = await getWorkingDay(date);
  if(!workingDay) return false;

  const start = convertToMinutes(startTime);
  const end = convertToMinutes(endTime);
  const workStart = convertToMinutes(workingDay.startTime);
  const workEnd = convertToMinutes(workingDay.endTime);

  return start >= workStart && end <= workEnd;
}



