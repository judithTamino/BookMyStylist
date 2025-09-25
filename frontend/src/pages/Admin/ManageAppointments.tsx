import { useEffect, useState, type FunctionComponent } from 'react';
import AdminLayout from '../../layout/AdminLayout';
import type {
  IAdminAppointment,
  ITab,
} from '../../interface/appointment.interface';
import { getAppointments } from '../../services/appointment.service';
import { errorMsg } from '../../services/toastify.service';
import AppointmentsTabs from '../../components/Appointments/AppointmentsTabs';
import { useAuth } from '../../context/auth.context';
import Loader from '../../components/UI/Loader/Loader';
import EmptyState from '../../components/UI/EmptyState/EmptyState';
import AppointmentTabel from '../../components/Admin/AppointmentTable';

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
        const statusArray = [
          { label: 'All', count: statusSummary.all || 0, status: 'all' },
          {
            label: 'Upcoming',
            count: statusSummary.confirmed || 0,
            status: 'confirmed',
          },
          {
            label: 'Cancelled',
            count: statusSummary.canceled || 0,
            status: 'cancelled',
          },
          {
            label: 'History',
            count: statusSummary.completed || 0,
            status: 'completed',
          },
        ];

        setTabs(statusArray);
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
        <div className='card'>
          <h2 className='text-lg md:text-2xl mb-4'>
            <i className='ri-calendar-line text-rose-600 mr-2' />
            <span className=''>My Appointments</span>
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 justify-items-center'>
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
            <AppointmentTabel appointments={appointments} />
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
