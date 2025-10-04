import axios from 'axios';
import type { IService } from '../interface/service.interface';

const API: string = `${import.meta.env.VITE_URL}/services`;

//Get All Services
export const getAllServices = (token: string) =>
  axios.get(`${API}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getActiveServices = () => axios.get(API);

// Get Active Services
export const getServiceDetails = (serviceId: string) => {
  return axios.get(`${API}/${serviceId}`);
};

// Like/Unlike Service
export const LikeUnlikeService = (serviceId: string, token: string) => {
  return axios.patch(
    `${API}/${serviceId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Create Service
export const CreateService = (token: string, service: IService) =>
  axios.post(API, service, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Delete Service
export const deleteService = (token: string, id: string) =>
  axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Get service details
export const getServiceDetail = (id: string) => axios.get(`${API}/${id}`);

// Update service
export const updateService = (token: string, id: string, service: IService) =>
  axios.put(`${API}/${id}`, service, {
    headers: { Authorization: `Bearer ${token}` },
  });
