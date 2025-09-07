import { useState, type FunctionComponent } from 'react';

import type { IService } from '../../interface/service.interface';
import ServiceDescriptionPopup from './ServiceDescriptionPopup';
import Button from '../UI/Button/Button';

interface ServiceCardProps {
  service: IService;
}

const ServiceCard: FunctionComponent<ServiceCardProps> = ({ service }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <div
      key={service._id}
      className='relative flex flex-row items-center gap-4'
    >
      <div className='bg-slate-50 dark:bg-slate-900 p-2 rounded w-16'>
        <img
          src={`/${service.category}.png`}
          alt={`${service.category} image`}
          className='w-full'
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
            className='text-indigo-600 dark:text-indigo-500 underline cursor-pointer'
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
        <Button onClick={() => {}} label='Book' />
      </div>
    </div>
  );
};

export default ServiceCard;
