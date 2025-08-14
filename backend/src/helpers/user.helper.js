// check if start time is after end time
export const validStartTime = (dayEntry) => {
  const { startTime, endTime } = dayEntry;
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  if (startHour * 60 + startMinute <= endHour * 60 + endMinute) return false
  return true;
}