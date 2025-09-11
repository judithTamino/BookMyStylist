import type { FunctionComponent } from 'react';
import type { IUserAppointment } from '../../interface/appointment.interface';
import Button from '../UI/Button/Button';

interface AppointmentCardProps {
  appointment: IUserAppointment;
  cancel: (id: string) => void;
}

const AppointmentCard: FunctionComponent<AppointmentCardProps> = ({
  appointment,
  cancel,
}) => {
  const date = new Date(appointment.date).toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className='border border-slate-200 dark:border-slate-800 rounded-lg p-8 py-7 mx-2 sm:mx-0 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-400 mt-4 grid grid-cols-[2fr_1fr] sm:flex gap-4'>
      <div className='flex-1 text-xs'>
        <h3 className='text-base text-slate-900 dark:text-slate-100 font-semibold capitalize'>
          {appointment.service.name}
        </h3>

        <div className='flex flex-col items-start md:flex-row md:items-center gap-4 md:gap-6 mt-2'>
          <p className='border border-slate-200 dark:border-slate-800 flex gap-2 py-0.5 px-2 rounded'>
            <i className='ri-time-line text-rose-600' />
            <span>{appointment.service.duration / 60}H</span>
          </p>

          <p className='border border-slate-200 dark:border-slate-800 flex gap-2 py-0.5 px-2 rounded'>
            <span>₪{appointment.service.price}</span>
          </p>

          <p className='bg-rose-600/10 dark:bg-rose-950/50 flex gap-2 py-0.5 px-2 rounded'>
            <span className='text-rose-600'>{appointment.status}</span>
          </p>
        </div>

        <div className='mt-4'>
          <p className='text-slate-900 dark:text-slate-100 font-semibold text-sm'>
            Address:
          </p>
          <p>567 East Cedar Street Some City</p>
        </div>

        <div className='mt-1'>
          <span className='text-slate-900 dark:text-slate-100 font-semibold text-sm mr-1.5'>
            Date & Time:
          </span>
          <span>{date}</span> <span className='text-rose-600'> | </span>{' '}
          <span>{appointment.startTime}</span>
        </div>
      </div>

      {appointment.status === 'confirmed' ? (
        <div>
          <Button size='sm' onClick={() => cancel(appointment._id)}>
            Cancel
          </Button>
          <p className='text-xs mt-2'>
            {' '}
            * Appointments cannot be cancelled less than 48 hours before the
            scheduled date
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default AppointmentCard;
