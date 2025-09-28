import type { FunctionComponent } from 'react';
import type { IAdminAppointment } from '../../interface/appointment.interface';
import { format } from 'date-fns';
import { getStatusBadgeColor } from '../../utils/appointments.utils';

interface RecentAppointmentsProps {
  recentAppointments: IAdminAppointment[];
}

const RecentAppointments: FunctionComponent<RecentAppointmentsProps> = (
  props
) => {
  const { recentAppointments } = props;

  return (
    <div className='card mt-8'>
      <h2 className='text-base md:text-lg mb-2'>
        <i className='ri-calendar-line mr-2 text-rose-600' />
        <span>Recent Appointments</span>
      </h2>

      <div className="flex gap-2 md:gap-4 text-sm md:text-base mb-8">
        <div className="flex items-center gap-1">
          <span className='w-2 h-3 rounded-full bg-emerald-600'></span>
          <span>completed</span>
        </div>

          <div className="flex items-center gap-1">
            <span className='w-2 h-3 rounded-full bg-amber-500'></span>
          <span>confirmed</span>
        </div>

          <div className="flex items-center gap-1">
            <span className='w-2 h-3 rounded-full bg-rose-600'></span>
          <span>cancelled</span>
        </div>
      </div>

      <ul className='space-y-4'>
        {recentAppointments.map((appointment) => (
          <li
            key={appointment._id}
            className={`flex justify-between items-center p-3 rounded-lg ${getStatusBadgeColor(appointment.status)}`}
          >
            <div>
              <p className='font-medium capitalize text-slate-900 dark:text-slate-100'>{appointment.user.name}</p>
              <p className='text-slate-700 dark:text-slate-400 text-xs md:text-sm'>
                {appointment.service.name}
              </p>
            </div>

            <div className='text-right'>
              <p className='text-slate-700 dark:text-slate-400 text-sm'>
                {format(appointment.date, 'EE dd MMM')} |{' '}
                <br className='block md:hidden' />
                {appointment.startTime}
              </p>

              {/* <span
                className={`mt-1 inline-block px-2 py-1 text-xs font-semibold rounded ${getStatusBadgeColor(
                  appointment.status
                )}`}
              >
                {appointment.status.toUpperCase()}
              </span> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentAppointments;
