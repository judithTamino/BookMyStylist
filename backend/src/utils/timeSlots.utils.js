// generate time slots from 17:00 to 23:00
export const generateTimeSlots = (appointmentDate) => {
  const slots = [];
  const currentDate = new Date();

  for (let hour = 10; hour < 23; hour++)
    for (let minute = 0; minute < 60; minute += 15)
      slots.push(`${hour.toString().padStart(2, "2")}:${minute.toString().padStart(2, "0")}`);

  // check if the appointment date is today
  if (appointmentDate.toDateString() === currentDate.toDateString()) {
    const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();

    // keep only the future slots
    return slots.filter(slot => {
      const [hour, minute] = slot.split(":").map(Number);
      const slotMinute = hour * 60 + minute;
      return slotMinute >= currentTime;
    });
  }

  return slots;
}

