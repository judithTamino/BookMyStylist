import axios from 'axios';
import type { IUser } from '../interface/user.interface';

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
