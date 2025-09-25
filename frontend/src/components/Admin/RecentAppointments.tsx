import type { FunctionComponent } from 'react';
import type { IAdminAppointment } from '../../interface/appointment.interface';
import { format } from 'date-fns';

interface RecentAppointmentsProps {
  recentAppointments: IAdminAppointment[];
}

const RecentAppointments: FunctionComponent<RecentAppointmentsProps> = (
  props
) => {
  const { recentAppointments } = props;

  const statusColors: Record<string, string> = {
    confirmed:
      'bg-emerald-600/10 text-emerald-600 border border-emerald-600/20',
    cancelled: 'bg-amber-500/10 text-amber-500 border border-amber-500/20',
    completed: 'bg-rose-600/10 text-rose-600 border border-rose-600/20',
  };

  return (
    <div className='card mt-8'>
      <h2 className='text-sm md:text-lg mb-4'>
        <i className='ri-calendar-line mr-2 text-rose-600' />
        <span>Recent Appointments</span>
      </h2>

      <ul className='space-y-3'>
        {recentAppointments.map((appointment) => (
          <li
            key={appointment._id}
            className='flex justify-between items-center p-3 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm hover:shadow-md transition'
          >
            <div>
              <p className='font-medium capitalize'>{appointment.user.name}</p>
              <p className='text-slate-700 dark:text-slate-400 text-xs md:text-sm'>
                {appointment.service.name}
              </p>
            </div>

            <div className='text-right'>
              <p className='text-slate-700 dark:text-slate-400 text-sm'>
                {format(appointment.date, 'EE dd MMM')} |{' '}
                {appointment.startTime}
              </p>

              <span
                className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded ${
                  statusColors[appointment.status]
                }`}
              >
                {appointment.status.toUpperCase()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentAppointments;
