import type { FunctionComponent } from "react";
import type { IService } from "../../interface/service.interface";

interface ServiceInfoProps {
  service: IService;
}

const ServiceInfo: FunctionComponent<ServiceInfoProps> = ({service}) => {
  return (
    <div className='border border-slate-200 dark:border-slate-800 rounded-lg p-8 py-7 mx-2 sm:mx-0 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-400'>
      <h3 className='text-3xl text-rose-600 capitalize font-playfair'>
        {service.name}
      </h3>

      <div className='flex flex-col items-start md:flex-row md:items-center gap-4 md:gap-6 mt-4'>
        <p className='uppercase text-base md:text-lg'>{service.category}</p>

        <p className='border border-slate-200 dark:border-slate-800 flex gap-2 py-0.5 px-2 rounded-full text-sm md:text-base'>
          <i className='ri-time-line' />
          <span>{service.duration} min</span>
        </p>

        <p className='border border-slate-200 dark:border-slate-800 flex gap-2 py-0.5 px-2 rounded-full text-sm md:text-base'>
          <i className='ri-money-dollar-circle-line' />
          <span>₪{service.price}</span>
        </p>
      </div>
    </div>
  );
};

export default ServiceInfo;
