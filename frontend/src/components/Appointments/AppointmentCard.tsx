import type { FunctionComponent } from 'react';
import type {
  IAdminAppointment,
  IUserAppointment,
} from '../../interface/appointment.interface';
import Button from '../UI/Button/Button';
import {
  canCancelAppointment,
  getStatusBadgeColor,
} from '../../utils/appointments.utils';
import { format } from 'date-fns';
import { useAuth } from '../../context/auth.context';
import decodeToken from '../../services/token.service';

interface AppointmentCardProps {
  appointment: IUserAppointment | IAdminAppointment;
  cancel: (id: string) => void;
}

const AppointmentCard: FunctionComponent<AppointmentCardProps> = (props) => {
  const { appointment, cancel } = props;
  const { token } = useAuth();
  const user = token ? decodeToken(token) : null;

  return (
    <div className='border border-slate-200 dark:border-slate-800 py-4 px-8 bg-white dark:bg-slate-950  text-slate-700 dark:text-slate-400 text-sm sm:text-base'>
      <div className='grid grid-cols-2 sm:grid-cols-3 justify-items-normal'>
        <div className='flex flex-col gap-0.5'>
          <span>{format(appointment.date, 'MMM')}</span>
          <span className='text-3xl sm:text-5xl  text-rose-600'>
            {format(appointment.date, 'd')}
          </span>
          <span>{format(appointment.date, 'EEE')}</span>
        </div>

        <div className='flex flex-col gap-4'>
          <div>
            <span className='text-xs block'>Time</span>
            <span className='text-slate-900 dark:text-slate-100'>
              {appointment.startTime}
            </span>
          </div>

          <div>
            <span className='text-xs block'>Service</span>
            <span className='text-slate-900 dark:text-slate-100 truncate block w-35'>
              {appointment.service.name}
            </span>
          </div>
        </div>

        <span
          className={`px-1 py-0.5 text-xs rounded mt-4 sm:mt-0 place-self-start ${getStatusBadgeColor(
            appointment.status
          )}`}
        >
          {appointment.status}
        </span>
      </div>

      <div className='flex flex-col gap-2 mt-6'>
        {!user?.isAdmin ? (
          <div className=''>
            <span className='text-xs block'>Address</span>
            <span className='text-slate-900 dark:text-slate-100'>
              567 East Cedar Street Some City
            </span>
          </div>
        ) : (
          <div className=''>
            <span className='text-xs block'>For</span>
            <span className='text-slate-900 dark:text-slate-100'>
              {appointment.user ? appointment.user.name : 'Deleted User'}
            </span>
          </div>
        )}
        {appointment.status === 'confirmed' ? (
          <div>
            {canCancelAppointment(appointment.date) ? (
              <Button size='sm' onClick={() => cancel(appointment._id)}>
                Cancel
              </Button>
            ) : (
              <p className='text-xs mb-4 font-semibold'>
                Cancellations aren`t allowed within 48 hours of your appointment
                <br />
                If you need urgent assistance, please contact us directly 053
                569 6159.
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AppointmentCard;
