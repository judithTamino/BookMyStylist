import type { FunctionComponent } from 'react';
import type { IAdminAppointment } from '../../interface/appointment.interface';

interface AppointmentsListTableProps {
  recentAppointments: IAdminAppointment[];
}

const AppointmentsListTable: FunctionComponent<AppointmentsListTableProps> = (
  props
) => {
  const { recentAppointments } = props;

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
        return 'bg-pink-600/10 text-pink-600 border border-pink-600/20';
      case 'cancelled':
        return 'bg-fuchsia-600/10 text-fuchsia-600 border border-fuchsia-600/20';
      case 'completed':
        return 'bg-purple-600/10 text-purple-600 border border-purple-600/20';
      default:
        return 'bg-slate-200 text-slate-700 border border-slate-300 dark: bg-slate-800 dark:text-slate-400 dark:border-slate-900';
    }
  };
  return (
    <div className='overflow-x-auto p-0 rounded-lg mt-3'>
      <table className='text-left'>
        <thead>
          <tr className='py-3 text-slate-700 dark:text-slate-400 font-medium text-sm'>
            <th className='py-3 px-4 text-slate-900 dark:text-slate-100 font-medium text-sm'>
              Service
            </th>
            <th className='py-3 px-4 text-slate-900 dark:text-slate-100 font-medium text-sm'>
              Date & Time
            </th>
            <th className='py-3 px-4 text-slate-900 dark:text-slate-100 font-medium text-sm'>
              Status
            </th>
            <th className='py-3 px-4 text-slate-900 dark:text-slate-100 font-medium text-sm'>
              Client
            </th>
            <th className='py-3 px-4 text-slate-700 dark:text-slate-100 font-medium text-sm hidden md:table-cell'>
              Contact Info
            </th>
          </tr>
        </thead>

        <tbody>
          {recentAppointments.map((appointment) => (
            <tr
              key={appointment._id}
              className='border-t border-slate-200 dark:border-slate-800'
            >
              <td className='my-3 mx-4 text-slate-700 dark:text-slate-400 text-xs line-clamp-1 overflow-hidden'>
                {appointment.service.name}
              </td>
              <td className='my-3 mx-4 text-slate-700 dark:text-slate-400 text-xs overflow-hidden'>
                {convertDate(appointment.date)} {appointment.startTime}
              </td>
              <td className='py-4 px-4'>
                <span
                  className={`px-2 py-1 text-xs rounded inline-block ${getStatusBadgeColor(
                    appointment.status
                  )}`}
                >
                  {appointment.status}
                </span>
              </td>
              <td className=''>{appointment.user.name}</td>
              <td className=''>{appointment.user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsListTable;
