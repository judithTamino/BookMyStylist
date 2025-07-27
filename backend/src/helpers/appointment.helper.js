// calculate the end time based on service duration 
export const calculateEndTime = (serviceDuration, startTime, date) => {
  const [hour, minute] = startTime.split(":").map(Number);
  const startDate = new Date(date);
  startDate.setHours(hour, minute);

  const endDate = new Date(startDate.getTime() + serviceDuration * 60000);
  const endTime = endDate.toTimeString().substring(0, 5);

  return endTime;
}