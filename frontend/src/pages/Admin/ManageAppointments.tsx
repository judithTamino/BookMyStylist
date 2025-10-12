import { useEffect, useState, type FunctionComponent } from 'react';
import AdminLayout from '../../layout/AdminLayout';
import type {
  IAdminAppointment,
  ITab,
} from '../../interface/appointment.interface';
import {
  cancelAppointment,
  getAppointments,
} from '../../services/appointment.service';
import { errorMsg, successMsg } from '../../services/toastify.service';
import AppointmentsTabs from '../../components/Appointments/AppointmentsTabs';
import { useAuth } from '../../context/auth.context';
import Loader from '../../components/UI/Loader/Loader';
import EmptyState from '../../components/UI/EmptyState/EmptyState';
import { statusArray } from '../../utils/appointments.utils';
import AppointmentTabel from '../../components/Admin/Table/AppointmentTable';

interface ManageAppointmentsProps {}

const ManageAppointments: FunctionComponent<ManageAppointmentsProps> = () => {
  const [appointments, setAppointments] = useState<IAdminAppointment[]>([]);
  const [tabs, setTabs] = useState<ITab[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  const { token } = useAuth();

  const getAllAppointments = (status: string = '') => {
    if (status === 'all') status = '';
    getAppointments(status, token as string)
      .then((res) => {
        setAppointments(res.data.data.appointments);

        const statusSummary = res.data?.data.statusSummary || {};
        setTabs(statusArray(statusSummary));
      })
      .catch((error) => errorMsg(error.response.data.msg));
  };

  const handleCancelAppointment = (id: string, status: string) => {
    cancelAppointment(id, token as string)
      .then((res) => {
        successMsg(res.data.msg);
        getAllAppointments(status);
      })
      .catch((error) => errorMsg(error.response.data.msg));
  };

  useEffect(() => {
    getAllAppointments(filterStatus);
    setLoading(false);
  }, [filterStatus]);

  return (
    <AdminLayout>
      <>
        <div className='card mt-5'>
          <h2 className='admin-title'>My Appointments</h2>
          <p className='admin-subtitle'>
            View, confirm, and manage all client bookings
          </p>
        </div>

        <div className='card my-4 md:my-6'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-2 justify-items-center'>
            {tabs.map((tab, index) => (
              <AppointmentsTabs
                key={index}
                tab={tab}
                FilterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
              />
            ))}
          </div>
        </div>
       
        <div className='relative card my-6 pb-20'>
          {appointments.length > 0 ? (
               <AppointmentTabel
               appointments={appointments}
               cancelAppointment={handleCancelAppointment}
             />
          ) : (
        
            <>
              {loading ? (
                <Loader loading={loading} />
              ) : (
                <EmptyState
                  icon='ri-calendar-line'
                  title='No Appointments'
                  message='You don`t have any appointments yet'
                />
              )}
            </>
          )}
        </div>
      </>
    </AdminLayout>
  );
};

export default ManageAppointments;
