import axios from 'axios';
import type { IUser } from '../interface/user.interface';
import type { ILogin } from '../interface/auth.interface';

const API: string = `${import.meta.env.VITE_URL}/auth`;

// Register User
export const register = (user: IUser) => axios.post(`${API}/register`, user)

// Login 
export const loginUser = (user: ILogin) => axios.post(`${API}/login`, user);
