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
import AppointmentsListTable from '../../components/Admin/AppointmentsListTable';

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

  console.log(appointments)



  return (
    <AdminLayout>
      <section className='py-2 md:py-4'>
        <div className='flex flex-col md:flex-row justify-between md:items-center'>
          <h2 className='text-2xl mb-4'>My Appointments</h2>
          <div className='grid grid-cols-1 gap-2'>
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

        <div className='mt-4'>
          <AppointmentsListTable appointments={appointments} />
        </div>
      </section>
    </AdminLayout>
  );
};

export default ManageAppointments;
