import { useEffect, useState, type FunctionComponent } from 'react';
import AdminLayout from '../../layout/AdminLayout';
import { useAuth } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { GetAdminDashboard } from '../../services/appointment.service';
import { errorMsg } from '../../services/toastify.service';
import type { IUser } from '../../interface/user.interface';
import decodeToken from '../../services/token.service';
import { getUserProfile } from '../../services/user.service';
import InfoCard from '../../components/Admin/Card/InfoCard';
import type { IAdminDashboard } from '../../interface/appointment.interface';
import Button from '../../components/UI/Button/Button';
import AppointmentsListTable from '../../components/Admin/AppointmentsListTable';

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
          <div className='grid grid-cols-2 xl:grid-cols-3 gap-2'>
            <InfoCard
              value={`${dashboardData.todayAppointments}`}
              label='Appointments Today'
              icon={<i className='ri-calendar-line' />}
            />

            <InfoCard
              value={`₪${dashboardData.revenue}`}
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

          <div className='card mt-8'>
            <h5 className='text-sm md:text-lg mb-4'>
              <i className='ri-calendar-line mr-2 text-rose-600' />
              <span>Recent Appointments</span>
            </h5>
            <AppointmentsListTable
              appointments={dashboardData.recentAppointments || []}
            />
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
