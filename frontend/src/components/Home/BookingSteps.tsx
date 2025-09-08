import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingSteps } from '../../assets/assets';
import Button from '../UI/Button/Button';

const BookingSteps: FunctionComponent = () => {
  const navigate = useNavigate();
  return (
    <section className='py-16 md:py-24 text-center'>
      <h2 className='section-title'>Book in 3 Easy Steps</h2>

      <ol className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto mt-10'>
        {bookingSteps.map((step, index) => (
          <li
            key={index}
            className='flex flex-col gap-4 items-center justify-center w-80 rounded-xl shadow-sm p-6 border border-slate-200 dark:border-slate-800 transition-colors duration-300 mx-auto'
          >
            <div className='w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center mb-4'>
              <span className='text-white text-lg'>{index + 1}</span>
            </div>

            <span className='text-lg font-semibold text-slate-900 dark:text-slate-100'>
              {step}
            </span>
          </li>
        ))}
      </ol>

      <div className='mt-10'>
        <Button onClick={() => navigate('/services')}>
          Book Now
          <i className='ri-arrow-right-s-line' />
        </Button>
      </div>
    </section>
  );
};

export default BookingSteps;
