import type { FunctionComponent } from 'react';
import type { IUserAppointment } from '../../interface/appointment.interface';
import Button from '../UI/Button/Button';

interface AppointmentCardProps {
  appointment: IUserAppointment;
  cancel: (id: string) => void;
}

const isCancelable = (appointment: IUserAppointment): boolean => {
  const appointmentDate = new Date(appointment.date);
  const currentDate = new Date();
  const cancellationDate = new Date(
    appointmentDate.getTime() - 48 * 60 * 60 * 1000
  );

  if (currentDate.getTime() >= cancellationDate.getTime()) return false;

  return true;
};

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
    <div className='border border-slate-200 dark:border-slate-800 rounded-lg p-8 py-7 mx-2 sm:mx-0 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-400 mt-4 flex flex-col gap-4'>
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
          {isCancelable(appointment) ? (
            <Button size='sm' onClick={() => cancel(appointment._id)}>
              Cancel
            </Button>
          ) : (
            <p className='text-xs p-4 mb-4 font-semibold'>
              Appointments cant ba canceled within 48 hours of the scheduled time.
              <br />If you need urgent assistance, please contact us directly 053 569 6159.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default AppointmentCard;
