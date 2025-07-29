// generate time slots from 17:00 to 23:00
export const generateTimeSlots = () => {
  const slots = [];

  for (let hour = 10; hour < 23; hour++)
    for (let minute = 0; minute < 60; minute += 15)
      slots.push(`${hour.toString().padStart(2, "2")}:${minute.toString().padStart(2, "0")}`);

  return slots;
}