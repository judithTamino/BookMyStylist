import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button/Button';

interface CtaProps {}

const Cta: FunctionComponent<CtaProps> = () => {
  const navigate = useNavigate();

  return (
    <section className='flex items-center justify-around border border-gray-200 rounded-2xl  bg-white dark:bg-slate-900 mt-30 mb-24 overflow-hidden'>
      <div className='w-full flex flex-col items-center justify-center p-8'>
        <p className='text-xl font-medium text-slate-700 dark:text-slate-400 mb-4'>
          Your Beauty, Your Way
        </p>
        <h2 className='text-4xl md:text-[50px] md:leading-[4rem] font-semibold max-w-lg bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent font-playfair dark:from-slate-100'>
          With SALON, <br />
          looking and feeling your best has never been simpler.
        </h2>
        <span className='text-sm md:text-lg text-slate-500 mt-10'>
          Choose a service
          <span className='text-amber-500 text-xl font-black'> · </span>
          Pick a time
          <span className='text-amber-500 text-xl font-black'> · </span>
          Confirm.
        </span>
        <div className='flex items-center justify-center gap-2 mt-8'>
          <Button
            onClick={() => navigate('/book-appointment')}
            label='Book Now'
          />
        </div>
      </div>

      <div className='w-full hidden lg:inline-block'>
        <img className='h-full' src='/cta.jpg' alt='leftSideImage' />
      </div>
    </section>
  );
};

export default Cta;
