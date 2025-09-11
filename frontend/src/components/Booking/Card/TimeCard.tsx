import type { FunctionComponent } from 'react';

interface TimeCardProps {
  timeSlot: string;
  index: number;
  timeIndex: number;
  handlePickedTime: (index: number) => void;
}

const TimeCard: FunctionComponent<TimeCardProps> = (props) => {
  const { timeSlot, index, timeIndex, handlePickedTime } = props;

  return (
    <p
      onClick={() => handlePickedTime(index)}
      className={`text-sm font-light px-5 py-2 rounded-full cursor-pointer ${
        timeIndex === index
          ? 'bg-rose-600 text-slate-100'
          : 'border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400'
      }`}
    >
      {timeSlot}
    </p>
    // <div
    //   onClick={() => handlePickedTime(index)}
    //   className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
    //     timeIndex === index
    //       ? 'bg-rose-600 text-slate-100'
    //       : 'border border-slate-200 dark:border-slate-800'
    //   }`}
    // >
    //   <p className='text-sm font-light px-5 py-2 rounded-full cursor-pointer text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800'>
    //     {timeSlot}
    //   </p>
    // </div>
  );
};

export default TimeCard;
