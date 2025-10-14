import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button/Button';

const Hero: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <section className='py-30 md:py-40'>
      <div className='grid gap-2 lg:grid-cols-[max-content_1fr] bg-rose-600 rounded-2xl p-2'>
        <img
          className='w-full lg:max-w-md max-h-[700px] rounded-2xl'
          src='/hero.jpg'
          alt='client image'
        />

        <div className='flex flex-col justify-center items-center bg-rose-50 w-full rounded-2xl p-6 lg:p-10 xl:p-16 text-center'>
          <h1 className='text-4xl md:text-7xl/20 font-bold font-playfair mb-5 text-rose-600'>
            Your Style, Your Confidence.
          </h1>

          <p className='text-lg text-slate-900 max-w-md mask-auto mb-6'>
            Hi, I`m Judith, your personal hairstylist.
            <br />
            Book your appointment today and step out looking your absolute best.
          </p>

          <div className='flex flex-col md:flex-row gap-2 mt-8'>
            <Button onClick={() => navigate('/services')}>
              Book Now
              <i className='ri-arrow-right-s-line' />
            </Button>

            <Button variant='secondary' onClick={() => navigate('/register')}>
              Signup
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
