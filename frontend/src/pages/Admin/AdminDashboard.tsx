import { useEffect, useState, type FunctionComponent } from 'react';
import AdminLayout from '../../layout/AdminLayout';
import { useAuth } from '../../context/auth.context';
import { GetAdminDashboard } from '../../services/appointment.service';
import { errorMsg } from '../../services/toastify.service';
import InfoCard from '../../components/Admin/Card/InfoCard';
import type { IAdminDashboard } from '../../interface/appointment.interface';
import { format } from 'date-fns';
import Button from '../../components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import RecentAppointmentsTable from '../../components/Admin/Table/RecentAppointmentsTable';

interface AdminDashboardProps {}

const AdminDashboard: FunctionComponent<AdminDashboardProps> = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState<IAdminDashboard | null>(
    null
  );

  const getAdminDashboardData = () => {
    GetAdminDashboard(token as string)
      .then((res) => {
        setDashboardData(res.data);
      })
      .catch((error) => errorMsg(error.response.data.msg));
  };

  useEffect(() => {
    getAdminDashboardData();
  }, []);

  return (
    <AdminLayout>
      {dashboardData && (
        <>
          <div className='card mt-5'>
            <div>
              <h2 className='admin-title'>Admin Dashboard</h2>
              <p className='admin-subtitle'>
                {format(new Date(), 'EEEE do MMM yyyy')}
              </p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mt-5'>
              <InfoCard
                label='Appointments Today'
                value={dashboardData.todayAppointments}
                color='bg-rose-600'
              />

              <InfoCard
                label='Revenue This Month'
                value={`₪${dashboardData.revenue}`}
                color='bg-pink-600'
              />

              <InfoCard
                label='Total Clients'
                value={dashboardData.users}
                color='bg-fuchsia-600'
              />

              <InfoCard
                label='Active Services'
                value={dashboardData.totalServices}
                color='bg-purple-600'
              />
            </div>
          </div>

          <div className='card my-4 md:my-6'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg'>Recent Appointments</h3>

              <Button
                size='sm'
                variant='secondary'
                onClick={() => navigate('/admin/appointments')}
              >
                <div className='flex items-center justify-center gap-1'>
                  <span className='hidden sm:block'>See All</span>
                  <i className='ri-arrow-right-line' />
                </div>
              </Button>
            </div>

            <RecentAppointmentsTable
              appointments={dashboardData.recentAppointments}
            />
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
