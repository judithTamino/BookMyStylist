import type { FunctionComponent } from 'react';

import type { IService } from '../../interface/service.interface';

interface ServiceCardProps {
  service: IService;
}

const ServiceCard: FunctionComponent<ServiceCardProps> = ({ service }) => {
  return (
    <div
      key={service._id}
      className='relative flex flex-row items-center cursor-pointer gap-4'
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
        <span>
          {service.duration} min
        </span>
        <span>
          {`₪${service.price}`}
        </span>
      </div>

      <i className='ri-arrow-right-s-line absolute right-0'/>
    </div>
  );
};

export default ServiceCard;
