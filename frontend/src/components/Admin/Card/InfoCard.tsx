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
      <div className='flex flex-col gap-4 text-xs lg:text-base'>
        <div className='bg-rose-600/20 rounded text-rose-600 px-2 py-1 flex items-center justify-between'>
          <span className='text-2xl mr-2'>{icon}</span>
          <span className='font-medium text-lg bg-rose-600 text-white px-2 py-1 rounded'>
            {value}
          </span>
        </div>

        <span className='text-lg text-slate-700 dark:text-slate-400 text-center'>
          {label}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
