import React, {
  useEffect,
  useMemo,
  useState,
  type FunctionComponent,
} from 'react';
import type { IService } from '../../interface/service.interface';
import DateCard from './Card/DateCard';
import { useAuth } from '../../context/auth.context';
import { getTimeSlots } from '../../services/appointment.service';
import { errorMsg } from '../../services/toastify.service';

interface TimeSlotPickerProps {
  service: IService;
  dates: Date[];
}

const TimeSlotPicker: FunctionComponent<TimeSlotPickerProps> = (props) => {
  const { service, dates } = props;

  const [slotIndex, setSlotIndex] = useState<number>(0);
  const { token } = useAuth();

  const handelPickedDate = (index: number) => setSlotIndex(index);

  useEffect(() => {
    const date = new Date(dates[slotIndex]);
    const serviceId = service._id;

    getTimeSlots(date, serviceId as string, token as string)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => errorMsg(error.response.data.msg));
  }, [slotIndex]);

  return (
    <div className='flex gap-3 items-center justify-between w-full overflow-x-scroll mt-8 md:overflow-auto'>
      {dates &&
        dates.map((date, i) => (
          <DateCard
            date={date}
            index={i}
            dateIndex={slotIndex}
            handelPickedDate={handelPickedDate}
          />
        ))}
    </div>
  );
};

export default TimeSlotPicker;
