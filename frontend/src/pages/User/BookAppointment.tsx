import { useEffect, type FunctionComponent } from 'react';
import MainLayout from '../../layout/MainLayout';
import { useParams } from 'react-router-dom';

interface BookAppointmentProps {}

const BookAppointment: FunctionComponent<BookAppointmentProps> = () => {
  const { serviceId } = useParams();

  useEffect(() => {
    // fetch service info
    
  }, [])

  return (
    <MainLayout>
      <div className=''></div>
    </MainLayout>
  );
};

export default BookAppointment;
