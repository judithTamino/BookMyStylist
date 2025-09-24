import type { FunctionComponent, ReactNode } from 'react';

interface InfoCardProps {
  icon?: ReactNode;
  label: string;
  value: string;
}

const InfoCard: FunctionComponent<InfoCardProps> = (props) => {
  const { icon, label, value } = props;

  return (
    <div className='card'>
      <div className='flex flex-col items-center text-center lg:flex-row gap-4 text-xs lg:text-base'>
        <div className='bg-rose-600/20 rounded text-rose-600 px-2 py-1'>
          {icon}
        </div>

        <div className='flex flex-col lg:flex-row gap-2 items-center'>
          <span className='text-sm lg:text-base font-medium'>{value}</span>
          <span className='text-sm text-slate-700 dark:text-slate-400'>{label}</span>
        </div>
      </div>
      {/* <div className='flex items-end gap-4 mb-4'>
        <span className='bg-rose-600 rounded text-white px-2 py-1'>{icon}</span>
        <p className='text-2xl font-bold'>{value}</p>
      </div>

      <p className='text-slate-700 dark:text-slate-400 font-medium text-lg'>
        {label}
      </p> */}
    </div>
  );
};

export default InfoCard;
