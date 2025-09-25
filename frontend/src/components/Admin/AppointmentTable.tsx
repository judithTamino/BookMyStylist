import { useState, type FunctionComponent } from 'react';
import type { IAdminAppointment } from '../../interface/appointment.interface';
import { format } from 'date-fns';
import Pagination from '../UI/Pagination/Pagination';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';

interface AppointmentTabelProps {
  appointments: IAdminAppointment[];
}

const AppointmentTabel: FunctionComponent<AppointmentTabelProps> = (props) => {
  const { appointments } = props;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [appointmentsPerPage] = useState<number>(4);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const lastAppointmentIndex = currentPage * appointmentsPerPage;
  const firstAppointmentIndex = lastAppointmentIndex - appointmentsPerPage;
  const currentAppointments: IAdminAppointment[] = appointments.slice(
    firstAppointmentIndex,
    lastAppointmentIndex
  );

  const handlePageChange = (data: any) => {
    setCurrentPage(data.selected + 1);
    window.scrollTo(0, 0);
  };

  const handleCancelAppointment = () => {
    
  }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-2'>
      {currentAppointments.map((appointment) => (
        <div className='border border-slate-200 dark:border-slate-800 py-8 px-2 bg-white dark:bg-slate-950 grid grid-cols-2 sm:grid-cols-3 text-slate-700 dark:text-slate-400 text-sm sm:text-base'>
          <div className='flex flex-col gap-0.5 items-center'>
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

          <div className='col-span-2 sm:col-auto flex flex-row sm:flex-col justify-between mt-8 sm:mt-0.5 items-center'>
            <div className=''>
              <span className='text-xs block'>For</span>
              <span className='text-slate-900 dark:text-slate-100'>
                {appointment.user ? appointment.user.name : 'Deleted User'}
              </span>
            </div>

            <div className=''>
              <Button size='sm' onClick={() => setOpenModal(true)}>
                <i className='ri-calendar-close-line' />
              </Button>
            </div>
          </div>

          <Modal
            open={openModal}
            variant='danger'
            icon={<i className='ri-delete-bin-line text-red-500' />}
            title='Are you sure?'
            contect={` Do you really want to continue? This action cannot be undone.`}
            cancelBtn={() => setOpenModal(false)}
            primaryBtn={() => handleCancelAppointment()}
          />
        </div>
      ))}

      <div className='absolute bottom-0 w-full p-4'>
        <Pagination
          totalAppointments={appointments.length}
          appointmentsPerPage={appointmentsPerPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AppointmentTabel;
