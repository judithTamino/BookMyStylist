import type { FunctionComponent} from 'react';

interface InfoCardProps {
  label: string;
  value: number | string;
  color: string;
}

const InfoCard: FunctionComponent<InfoCardProps> = (props) => {
  const { label, value, color } = props;

  return (
    <div className='flex items-center gap-3'>
      <div className={`w-2 h-3 md:h-5 ${color} rounded-full`} />

      <p className='text-xs md:text-sm text-slate-700 dark:text-slate-400'>
        <span className='text-sm md:text-[15px] text-black dark:text-white font-semibold'>{value}</span> {label}
      </p>
    </div>
  );
};

export default InfoCard;
