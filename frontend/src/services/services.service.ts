import axios from 'axios';

const API: string = `${import.meta.env.VITE_URL}/services`;

// get all active services
export const getActiveServices = () => axios.get(API);

// Get service details
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
