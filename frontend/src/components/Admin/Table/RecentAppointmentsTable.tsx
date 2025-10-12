import { format } from 'date-fns';
import type { IAdminAppointment } from '../../../interface/appointment.interface';
import type { FunctionComponent } from 'react';
import { getStatusBadgeColor } from '../../../utils/appointments.utils';

interface RecentAppointmentsTableProps {
  appointments: IAdminAppointment[];
}

const RecentAppointmentsTable: FunctionComponent<
  RecentAppointmentsTableProps
> = (props) => {
  const { appointments } = props;
  return (
    <div className='overflow-x-auto p-0 mt-5'>
      <table className='min-w-full divide-y divide-slate-200 dark:divide-slate-800'>
        <thead className='bg-slate-50 dark:bg-slate-900'>
          <tr className=''>
            <th className='table-head'></th>
            <th className='table-head'>client</th>
            <th className='table-head hidden md:table-cell'>service</th>
            <th className='table-head'>status</th>
          </tr>
        </thead>

        <tbody className='divide-y divide-slate-200 dark:divide-slate-800'>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td className='table-col line-clamp-2 overflow-hidden text-left'>
                {format(appointment.date, 'EE MMM dd')}
                <br />
                <span>{appointment.startTime}</span>
              </td>

              <td className='table-col text-left'>
                {appointment.user ? (
                  <>
                    {appointment.user.name}
                    <br />
                    <span className='hidden sm:block text-slate-600 dark:text-slate-400'>
                      {' '}
                      {appointment.user.email}
                    </span>
                  </>
                ) : (
                  'Deleted User'
                )}
              </td>
              <td className='table-col text-nowrap hidden md:table-cell text-left'>
                {appointment.service
                  ? appointment.service.name
                  : 'Deleted Service'}
              </td>
              <td className='table-col'>
                <span
                  className={`rounded-md px-4 py-px text-xs font-semibold antialiased ${getStatusBadgeColor(
                    appointment.status
                  )}`}
                >
                  {appointment.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentAppointmentsTable;
