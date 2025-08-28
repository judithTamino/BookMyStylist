import { Bounce, toast } from 'react-toastify';

export const successMsg = (msg: string) => {
  toast.success(msg, {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    transition: Bounce,
  });
};

export const errorMsg = (msg: string) => {
  toast.error(msg, {
    position: 'bottom-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    transition: Bounce,
  });
};
