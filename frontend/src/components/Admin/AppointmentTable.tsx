import { useState, type FunctionComponent } from 'react';
import type { IAdminAppointment } from '../../interface/appointment.interface';
import Pagination from '../UI/Pagination/Pagination';
import AppointmentCard from '../Appointments/AppointmentCard';

interface AppointmentTabelProps {
  appointments: IAdminAppointment[];
  cancelAppointment: (id:string, status:string) => void;
}

const AppointmentTabel: FunctionComponent<AppointmentTabelProps> = (props) => {
  const { appointments, cancelAppointment } = props;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [appointmentsPerPage] = useState<number>(4);

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

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 xl:gap-2'>
      {currentAppointments.map((appointment) => (
        <AppointmentCard
        key={appointment._id}
          appointment={appointment}
          cancel={cancelAppointment}
        />
      ))}

      <div className='absolute bottom-0 w-full p-4'>
        <Pagination
          totalItems={appointments.length}
          itemsPerPage={appointmentsPerPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default AppointmentTabel;
