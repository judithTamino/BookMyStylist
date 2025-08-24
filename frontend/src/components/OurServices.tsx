import type { FunctionComponent } from 'react';
import Button from './Button/Button';
import { useNavigate } from 'react-router-dom';

interface OurServicesProps {}

const OurServices: FunctionComponent<OurServicesProps> = () => {
  const navigate = useNavigate();

  return (
    <section className='flex flex-col md:flex-row items-center justify-center gap-10 max-md:px-4 mt-20 mb-4'>
      <img
        className='max-w-md w-full object-cover rounded-2xl'
        src='/services.jpg'
        alt='client image'
      />

      <div className='text-sm text-slate-700 dark:text-slate-400 max-w-lg'>
        <h2 className='text-xl uppercase font-semibold text-slate-900 dark:text-slate-100'>
          Our Services
        </h2>
        <div className='w-24 h-[3px] rounded-full bg-gradient-to-r from-amber-500 to-[#fff4d9]'></div>
        <p className='mt-8'>
          From elegant cuts to luxurious color treatments, soft blowouts, and
          special occasion styling – we create looks that highlight your natural
          beauty.
        </p>
        <div className='flex items-center gap-2 mt-8'>
          <Button onClick={() => navigate('/services')} label='Our Services' />
        </div>
      </div>
    </section>
  );
};

export default OurServices;
