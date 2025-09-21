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
import type {
  IAdminAppointment,
  IStatistics,
} from '../../interface/appointment.interface';
import StatisticsCard from '../../components/Admin/Card/StatisticsCard';
import Button from '../../components/UI/Button/Button';
import AppointmentsListTable from '../../components/Admin/AppointmentsListTable';

interface AdminDashboardProps {}

const AdminDashboard: FunctionComponent<AdminDashboardProps> = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState();
  const [statistics, setStatistics] = useState<IStatistics[]>([]);
  const [todayAppointments, setTodayAppointments] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [recentAppointments, setRecentAppointments] = useState<
    IAdminAppointment[]
  >([]);
  const [pieChartData, setPieChartData] = useState();

  const [admin, setAdmin] = useState<IUser>();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const today = new Date();

  const getAdminDashboardData = () => {
    GetAdminDashboard(token as string)
      .then((res) => {
        const statisticsSummary = res.data.statistics || {};
        setRecentAppointments(res.data.recentAppointments);

        const statisticsArray = [
          {
            label: 'Total',
            value: statisticsSummary.totalAppointments,
            color: 'bg-rose-600',
          },
          {
            label: 'Confirmed',
            value: statisticsSummary.totalConfirmedAppointments,
            color: 'bg-pink-600',
          },
          {
            label: 'Cancelled',
            value: statisticsSummary.totalCancelledAppointments,
            color: 'bg-fuchsia-600',
          },
          {
            label: 'Completed',
            value: statisticsSummary.totalCompletedAppointments,
            color: 'bg-purple-600',
          },
        ];

        setStatistics(statisticsArray);
      })
      .catch((error) => errorMsg(error.response.data.msg));
  };

  const getAdminInfo = () => {
    const decotedToken = token ? decodeToken(token) : null;

    getUserProfile(decotedToken?._id as string, token as string)
      .then((res) => setAdmin(res.data.data))
      .catch((error) => errorMsg(error.response.data.msg));
  };

  useEffect(() => {
    getAdminDashboardData();
    getAdminInfo();
  }, []);

  return (
    <AdminLayout>
      {admin && (
        <>
          <div className='card my-2'>
            <div className='col-span-3'>
              <h2 className='text-2xl md:text-4xl font-medium capitalize'>
                Hi,
                <br className='block md:hidden' /> {admin.name}
              </h2>
              <p className='text-xs md:text-sm text-slate-700 dark:text-slate-400 mt-1.5'>
                {today.toDateString()}
              </p>
            </div>
          </div>

          <div className='card my-8'>
            <h3 className='text-xl md:text-2xl capitalize'>
              <span className='text-rose-600 font-medium'>
                {months[today.getMonth()]}
              </span>{' '}
              overview
            </h3>
            <div className='mt-8'>
              <div className='grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 mt-5'>
                {statistics.map((statistic, index) => (
                  <StatisticsCard key={index} statistic={statistic} />
                ))}
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6'>
            <div className='md:col-span-2'>
              <div className='card'>
                <div className='flex items-center justify-between'>
                  <h5 className='text-lg'>Recent Appointments</h5>

                  <Button
                    variant='text'
                    onClick={() => navigate('/admin/appointments')}
                  >
                    <i className='ri-arrow-right-line' />
                    See All
                  </Button>
                </div>

                <AppointmentsListTable
                  recentAppointments={recentAppointments || []}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
