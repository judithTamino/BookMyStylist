import { useState, type FunctionComponent } from 'react';

import type { IService } from '../../interface/service.interface';
import ServiceDescriptionPopup from './ServiceDescriptionPopup';
import Button from '../UI/Button/Button';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  service: IService;
}

const ServiceCard: FunctionComponent<ServiceCardProps> = ({ service }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <div
      key={service._id}
      className='relative flex flex-row items-center gap-4'
    >
      <div className='bg-rose-600/10 dark:bg-rose-600/30 p-2 rounded-2xl self-start'>
        <img
          src={`/${service.category}.png`}
          alt={`${service.category} image`}
          className='w-10 '
        />
      </div>

      <div className='flex flex-col gap-0.5 text-sm text-slate-700 dark:text-slate-400'>
        <h3 className='text-sm sm:text-base font-semibold capitalize mb-1 truncate max-w-[150px] sm:max-w-[500px]'>
          {service.name}
        </h3>
        <span>{service.duration} min</span>
        <span>{`₪${service.price}`}</span>
        <div className='mt-1.5'>
          <span
            onClick={() => setShowPopup(true)}
            className='text-rose-600 underline cursor-pointer'
          >
            more info
          </span>

          <ServiceDescriptionPopup
            showPopup={showPopup}
            closePopup={setShowPopup}
          >
            <h3 className='capitalize mb-1 font-semibold'>{service.name}</h3>
            <p className='text-sm text-slate-500'>{service.description}</p>
          </ServiceDescriptionPopup>
        </div>
      </div>

      <div className='absolute right-0 bottom-0'>
        <Button size='sm' onClick={() => navigate(`/book-appointment/${service._id}`)}>Book Now</Button>
      </div>
    </div>
  );
};

export default ServiceCard;
