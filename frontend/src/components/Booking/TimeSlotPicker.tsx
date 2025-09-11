import React, {
  useEffect,
  useMemo,
  useState,
  type FunctionComponent,
} from 'react';
import type { IService } from '../../interface/service.interface';
import DateCard from './Card/DateCard';
import { useAuth } from '../../context/auth.context';
import {
  bookAppointment,
  getTimeSlots,
} from '../../services/appointment.service';
import { errorMsg, successMsg } from '../../services/toastify.service';
import TimeCard from './Card/TimeCard';
import Button from '../UI/Button/Button';
import type { IAppointment } from '../../interface/appointment.interface';
import { useNavigate } from 'react-router-dom';

interface TimeSlotPickerProps {
  service: IService;
  dates: Date[];
}

const TimeSlotPicker: FunctionComponent<TimeSlotPickerProps> = (props) => {
  const { service, dates } = props;
  const { token } = useAuth();
  const navigate = useNavigate();

  const [slotIndex, setSlotIndex] = useState<number>(0);
  const [timeIndex, setTimeIndex] = useState<number>(0);
  const [timeSlots, setTimeslots] = useState<string[]>([]);
 
  const handelPickedDate = (index: number) => setSlotIndex(index);
  const handlePickedTime = (index: number) => setTimeIndex(index);

  useEffect(() => {
    const date = new Date(dates[slotIndex]);
    const serviceId = service._id;

    getTimeSlots(date, serviceId as string, token as string)
      .then((res) => {
        setTimeslots(res.data.data);
      })
      .catch((error) => errorMsg(error.response.data.msg));
  }, [slotIndex]);

  const handleBookAppointment = () => {
    const appointment: IAppointment = {
      date: dates[slotIndex],
      startTime: timeSlots[timeIndex],
    };

    bookAppointment(service._id as string, token as string, appointment)
      .then((res) => {
        successMsg(res.data.msg);
        navigate('/my-appointments');
      })
      .catch((error) => errorMsg(error.response.data.msg));
  };

  return (
    <>
      <div className='flex p-4 md:p-2 gap-10 items-center w-full overflow-x-scroll mt-8 md:overflow-auto'>
        {dates &&
          dates.map((date, i) => (
            <DateCard
              key={i}
              date={date}
              index={i}
              dateIndex={slotIndex}
              handelPickedDate={handelPickedDate}
            />
          ))}
      </div>
      {timeSlots.length === 0 ? (
        <p className='mt-8 text-xl'>
          Looks like we are fully booked at the moment.
          <br />
          If it`s urgent, dont worry call us directly at{' '}
          <span className='text-rose-600'>053 569 6159</span> and we try to help
        </p>
      ) : (
        <div className='flex p-4 md:p-2 gap-10 items-center w-full overflow-x-auto mt-8'>
          {timeSlots.map((time, index) => (
            <TimeCard
              key={index}
              timeSlot={time}
              index={index}
              timeIndex={timeIndex}
              handlePickedTime={handlePickedTime}
            />
          ))}
        </div>
      )}
      <div className='mt-8'>
        <Button onClick={() => handleBookAppointment()}>
          Book Appointment
        </Button>
      </div>
    </>
  );
};

export default TimeSlotPicker;
