import { useEffect, useState, type FunctionComponent } from 'react';
import AdminLayout from '../../layout/AdminLayout';
import { useAuth } from '../../context/auth.context';
import { GetAdminDashboard } from '../../services/appointment.service';
import { errorMsg } from '../../services/toastify.service';
import InfoCard from '../../components/Admin/Card/InfoCard';
import type { IAdminDashboard } from '../../interface/appointment.interface';
import RecentAppointments from '../../components/Admin/RecentAppointments';

interface AdminDashboardProps {}

const AdminDashboard: FunctionComponent<AdminDashboardProps> = () => {
  const { token } = useAuth();

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
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2'>
            <InfoCard
              value={`${dashboardData.todayAppointments}`}
              label='Appointments Today'
              icon={<i className='ri-calendar-line' />}
            />

            <InfoCard
              value={`₪ ${dashboardData.revenue}`}
              label='Revenue This Month'
              icon={<i className='ri-cash-line' />}
            />

            <InfoCard
              value={`${dashboardData.users}`}
              label='Total Clients'
              icon={<i className='ri-group-line' />}
            />

            <InfoCard
              value={`${dashboardData.totalServices}`}
              label='Active Services'
              icon={<i className='ri-scissors-line' />}
            />
          </div>

          <RecentAppointments
            recentAppointments={dashboardData.recentAppointments}
          />
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
