// import Button from './UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button/Button';

const OurServices = () => {
  const navigate = useNavigate();

  return (
    <section className='py-16  md:py-24'>
      <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-[1fr_max-content] bg-rose-600 rounded-2xl p-2'>
        <div className='flex flex-col justify-center md:items-center bg-rose-50 w-full rounded-2xl p-6 lg:p-10 xl:p-16 md:text-center'>
          <h2 className='section-title text-slate-900'>Our Services</h2>

          <p className='text-lg text-slate-700 max-w-md mask-auto mb-6'>
            From elegant cuts to luxurious color treatments, soft blowouts, and
            special occasion styling – we create looks that highlight your
            natural beauty.
          </p>

          <div className='flex items-center gap-2 mt-8'>
            <Button onClick={() => navigate('/services')}>
              View All Services
              <i className='ri-arrow-right-s-line' />
            </Button>
          </div>
        </div>

        <img
          className='w-full md:max-w-md max-h-[700px] rounded-2xl'
          src='/services.jpg'
          alt='client image'
        />
      </div>
    </section>
  );
};

export default OurServices;
