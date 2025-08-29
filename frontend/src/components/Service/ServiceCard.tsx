import type { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

import type { IService } from "../../interface/service.interface";
import Button from "../Button/Button";

interface ServiceCardProps {
  service: IService;
}

const ServiceCard: FunctionComponent<ServiceCardProps> = ({service}) => {
   const navigate = useNavigate();
   
  return (
    <div
      key={service._id}
      className='bg-slate-50 dark:bg-slate-900 rounded-md shadow p-8 flex flex-col items-center text-center cursor-pointer'
    >
      <h3 className='font-playfair font-semibold text-md capitalize mb-2'>
        {service.name}
      </h3>

      <p className='text-center font-bold text-4xl'>{`₪${service.price}`}</p>

      <p className='text-sm text-slate-700 dark:text-slate-400 mb-6 flex'>
        <i className='ri-time-line mr-1' />
        {service.duration} minutes
      </p>

      <div className='mb-6'>
        <Button
          label='Book Now'
          onClick={() => navigate('/book-appointment')}
        />
      </div>

      <p className='text-slate-500 text-sm'>{service.description}</p>
    </div>
  );
};

export default ServiceCard;
