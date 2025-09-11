import axios from 'axios';
import type { IAppointment } from '../interface/appointment.interface';
const API: string = `${import.meta.env.VITE_URL}/appointments`;

// Get Available Time Slots
export const getTimeSlots = (date: Date, serviceId: string, token: string) => {
  return axios.get(`${API}/${date}/available`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { serviceId: serviceId },
  });
};

// Book Appointments
export const bookAppointment = (
  serviceId: string,
  token: string,
  appointment: IAppointment
) => {
  return axios.post(`${API}/${serviceId}`, appointment, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
