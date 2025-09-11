import { useEffect, useState, type FunctionComponent } from 'react';
import MainLayout from '../../layout/MainLayout';
import AppointmentsTabs from '../../components/Appointments/AppointmentsTabs';
import { useAuth } from '../../context/auth.context';
import {
  cancelAppointment,
  getAppointments,
} from '../../services/appointment.service';
import { errorMsg, successMsg } from '../../services/toastify.service';
import type {
  ITab,
  IUserAppointment,
} from '../../interface/appointment.interface';
import { useNavigate } from 'react-router-dom';
import AppointmentCard from '../../components/Appointments/AppointmentCard';
import Button from '../../components/UI/Button/Button';

interface AppointmentsProps {}

const Appointments: FunctionComponent<AppointmentsProps> = () => {
  const { token } = useAuth();

  const [allAppointments, setAllAppointments] = useState<IUserAppointment[]>(
    []
  );
  const [tabs, setTabs] = useState<ITab[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const getAllAppointments = (status: string) => {
    if (status === 'all') status = '';

    getAppointments(status, token as string)
      .then((res) => {
        setAllAppointments(res.data.data.appointments);

        // map statusSummary data with fixed labels
        const statusSummary = res.data?.data.statusSummary || {};
        const statusArray = [
          { label: 'All', count: statusSummary.all || 0, status: 'all' },
          {
            label: 'Upcoming',
            count: statusSummary.confirmed || 0,
            status: 'confirmed',
          },
          {
            label: 'Canceled',
            count: statusSummary.canceled || 0,
            status: 'canceled',
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

  const handleCanceleAppointment = (appointmentId: string) => {
    cancelAppointment(appointmentId, token as string)
      .then((res) => successMsg(res.data.msg))
      .catch((error) => errorMsg(error.response.data.msg));
  };

  useEffect(() => {
    getAllAppointments(filterStatus);
  }, [filterStatus]);

  return (
    <MainLayout>
      <section className='py-30 md:py-40'>
        <div className='flex flex-col md:flex-row justify-between md:items-center'>
          <h2 className='section-title'>My Appointments</h2>
          <div className='flex flex-wrap gap-4 md:gap-6'>
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
          {allAppointments.length === 0 ? (
            <div className='flex flex-col items-start gap-6'>
              <span>
                You don`t have any appointments yet.
                <br />
                Book one now and let us take care of you
              </span>
              <Button size='sm'>Book Now</Button>
            </div>
          ) : (
            <div className='grid md:grid-cols-2 gap-4'>
              {allAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment._id}
                  appointment={appointment}
                  cancel = {handleCanceleAppointment}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Appointments;
