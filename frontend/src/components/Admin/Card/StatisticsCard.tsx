import type { FunctionComponent } from 'react';
import type { IStatistics } from '../../../interface/appointment.interface';

interface StatisticsCardProps {
  statistic: IStatistics;
}

const StatisticsCard: FunctionComponent<StatisticsCardProps> = (props) => {
  const { statistic } = props;

  return (
    <div className={`flex items-center gap-3`}>
      <div className={`w-2 h-3 md:h-5 ${statistic.color} rounded-full`} />

      <p className='text-xs md:text-sm text-slate-700 dark:text-slate-400'>
        <span className='text-sm md:text-[15px] text-black dark:text-white font-semibold'>
          {statistic.value}{' '}
        </span>
        {statistic.label}
      </p>
    </div>
  );
};

export default StatisticsCard;
