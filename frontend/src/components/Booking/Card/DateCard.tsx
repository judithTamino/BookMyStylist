import type { FunctionComponent } from 'react';
import { data } from 'react-router-dom';

interface DateCardProps {
  date: Date;
  index: number;
  dateIndex: number;
  handelPickedDate: (index: number) => void;
}

console.log(data);

const DateCard: FunctionComponent<DateCardProps> = (props) => {
  const { date, index, dateIndex, handelPickedDate } = props;
  const workDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'];

  return (
    <div
      onClick={() => handelPickedDate(index)}
      className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
        dateIndex === index
          ? 'bg-rose-600 text-slate-100'
          : 'border border-slate-200 dark:border-slate-800'
      }`}
    >
      <p> {workDays[date.getDay()]}</p>
      <p>{date.getDate()}</p>
    </div>
  );
};

export default DateCard;
