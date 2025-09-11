import { type FunctionComponent } from 'react';
import type { ITab } from '../../interface/appointment.interface';

interface AppointmentsTabsProps {
  tab: ITab;
  FilterStatus: string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
}

const AppointmentsTabs: FunctionComponent<AppointmentsTabsProps> = (props) => {
  const { tab, FilterStatus, setFilterStatus} = props;
 
  return (
    <div
      onClick={() => setFilterStatus(tab.status)}
      className='flex gap-1 text-base cursor-pointer'
    >
      <span
        className={`${
          FilterStatus === tab.status
            ? 'text-rose-600'
            : 'text-slate-700 dark:text-slate-400 hover:text-rose-600'
        }`}
      >
        {tab.label}
      </span>
      <span
        className={`text-xs ml-2 px-2 py-1 rounded-full ${
          FilterStatus === tab.status
            ? 'bg-rose-600 text-white'
            : 'bg-slate-50 text-slate-700 dark:text-slate-400'
        }`}
      >
        {tab.count}
      </span>
    </div>
  );
};

export default AppointmentsTabs;
