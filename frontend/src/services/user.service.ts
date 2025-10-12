import axios from 'axios';
import type { IUser, IWorkingHours } from '../interface/user.interface';

const API: string = `${import.meta.env.VITE_URL}/users`;

// Get User Profile
export const getUserProfile = (userId: string, token: string) => {
  return axios.get(`${API}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update User Profile
export const updateUserProfile = (userId: string, token: string, user: IUser) =>
  axios.put(`${API}/${userId}`, user, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Delete User
export const deleteUser = (userId: string, token: string) => {
  return axios.delete(`${API}/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Insert / Update Working Hours
export const insertAndUpdateWorkingHours = (token: string, data: { workingHours: IWorkingHours[] }) => {
    return axios.put(`${API}/working-hours`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
} 
