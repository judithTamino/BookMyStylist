import axios from 'axios';
import type { IUser } from '../interface/IUser';

const API: string = import.meta.env.VITE_URL;

// Register User
export const register = (user: IUser) => {
  console.log(user);
  return axios.post(`${API}/auth/register`, user);
};
