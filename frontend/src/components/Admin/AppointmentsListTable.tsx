import type { FunctionComponent } from 'react';
import type { IAdminAppointment } from '../../interface/appointment.interface';

interface AppointmentsListTableProps {
  appointments: IAdminAppointment[];
}

const AppointmentsListTable: FunctionComponent<AppointmentsListTableProps> = (
  props
) => {
  const { appointments } = props;

  const convertDate = (appointmentDate: Date): string => {
    const date = new Date(appointmentDate);
    const locale = 'he-IL';

    return date
      .toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      })
      .replaceAll('.', '/');
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-600/10 text-emerald-600 border border-emerald-600/20';
      case 'cancelled':
        return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
      case 'completed':
        return 'bg-rose-600/10 text-rose-600 border border-rose-600/20';
      default:
        return 'bg-slate-200 text-slate-700 border border-slate-300 dark: bg-slate-800 dark:text-slate-400 dark:border-slate-900';
    }
  };

  return (
    <>
      {appointments.map((appointment) => (
        <div
          key={appointment._id}
          className='border-b border-slate-200 dark:border-slate-800 py-3 text-sm text-slate-700 dark:text-slate-400'
        >
          <div className='flex items-center justify-between gap-2'>
            <span className='text-slate-900 dark:text-slate-100 font-semibold'>
              {appointment.user? appointment.user.name : "Deleted User"}
            </span>

            <span
              className={`px-1 py-0.5 text-xs rounded inline-block ${getStatusBadgeColor(
                appointment.status
              )}`}
            >
              {appointment.status}
            </span>
          </div>

          <p className='mt-4'>{appointment.service.name}</p>

          <div className='flex flex-col md:flex-row md:gap-4 mt-2'>
            <span className='flex gap-2 mb-1'>
              <i className='ri-calendar-line text-rose-600' />
              <span>{convertDate(appointment.date)} | </span>
              <span>{appointment.startTime}</span>
            </span>

            <span className='flex gap-2'>
              <i className='ri-mail-line text-rose-600' />
              <span>{appointment.user ? appointment.user.email : "Deleted User"}</span>
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default AppointmentsListTable;
