import axios from 'axios';

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
