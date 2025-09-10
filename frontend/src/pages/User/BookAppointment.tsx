import { useEffect, useState, type FunctionComponent } from 'react';
import MainLayout from '../../layout/MainLayout';
import { useParams } from 'react-router-dom';
import { getServiceDetails } from '../../services/services.service';
import type { IService } from '../../interface/service.interface';
import { errorMsg } from '../../services/toastify.service';
import ServiceInfo from '../../components/Booking/ServiceInfo';
import TimeSlotPicker from '../../components/Booking/TimeSlotPicker';

interface BookAppointmentProps {}

const BookAppointment: FunctionComponent<BookAppointmentProps> = () => {
  const { id } = useParams();
  const [service, setService] = useState<IService>();
  const [dates, setDates] = useState<Date[]>([]);
  const [timeSlots, setTimeslots] = useState<string[]>([]);
 

  useEffect(() => {
    // fetch service info
    getServiceDetails(id as string)
      .then((res) => setService(res.data.data))
      .catch((error) => errorMsg(error.response.data.msg));
  }, []);

  useEffect(() => {
    const today: Date = new Date();
    const dateSlots: Date[] = [];

    for (let i = 0; i <= 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // get all dates from today - seven days from today not include Saturday
      if (currentDate.getDay() !== 6) dateSlots.push(currentDate);
    }

    setDates(dateSlots);
  }, [service]);

  return (
    <MainLayout>
      <section className='py-30 md:py-40'>
        {service && (
          <>
            <ServiceInfo service={service} />
            <TimeSlotPicker
              dates={dates}
              service={service}
            />
          </>
        )}
      </section>
    </MainLayout>
  );
};

export default BookAppointment;
