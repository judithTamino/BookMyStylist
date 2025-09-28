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
      <div className='grid grid-cols-[1fr_4fr] gap-4'>
        <div className='bg-rose-600/30 text-rose-600 h-full w-full flex items-center justify-center text-2xl rounded-sm'>
          {icon}
        </div>

        <div className='flex flex-col'>
          <span className='text-xl font-semibold'>{value}</span>
          <span className='text-slate-700 dark:text-slate-400'>{label}</span>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
