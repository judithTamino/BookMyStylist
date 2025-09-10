import axios from 'axios';
const API: string = `${import.meta.env.VITE_URL}/appointments`;

// Get Available Time Slots
export const getTimeSlots = (date: Date, serviceId: string, token: string) => {
  return axios.get(`${API}/${date}/available`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { serviceId: serviceId },
  });
};
