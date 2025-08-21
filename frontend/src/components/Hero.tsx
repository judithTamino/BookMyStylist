import type { FunctionComponent } from 'react';
import Button from './Button/Button';
import { useNavigate } from 'react-router-dom';

interface HeroProps {}

const Hero: FunctionComponent<HeroProps> = () => {
  const navigate = useNavigate();

  return (
 <></>
  );
};

// <section className='flex flex-col md:flex-row flex-wrap rounded-lg px-6 md:px-10 lg:px-20'>
{
  /* <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <h1 className='text-slate-900 dark:text-slate-100 font-black text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight mb-4'>
          Your Personal Hairdresser,
          <span className='text-indigo-600'> Just a Click Away</span>
        </h1>

        <Button onClick={() => navigate('book-appointmant')} label='Book Now' />
      </div> */
}

{
  /* <div className='md:w-1/2 relative'>
        <img
          src='/hero.jpg'
          alt=''
          className='w-full md:absolute bottom-0 h-auto rounded-lg'
        />
      </div> */
}
{
  /* <div className='flex flex-col md:flex-row items-center max-md:text-center justify-between mt-16 py-16 px-6 sm:px-10 md:px-24 max-w-7xl mx-auto w-full'>
        <div className='flex flex-col items-center md:items-start'>
          <h1 className='text-gray-900 dark:text-neutral-200 font-semibold text-3xl sm:text-4xl md:text-5xl max-w-2xl leading-tight'>
            Your Personal Hairdresser,
            <span className='text-indigo-600'> Just a Click Away</span>
          </h1>

          <p className='mt-4 text-gray-600 dark:text-neutral-300 max-w-md text-sm sm:text-base leading-relaxed'>
            Looking for a fresh new look or just a quick trim? <br />
            With Book My Stylist, you can easily browse services, choose your
            favorite stylist, and book appointments anytime — all in one place.
          </p>

          <div className='flex flex-col md:flex-row items-center mt-8 gap-3'>
            <button className='bg-indigo-600 text-white px-8 py-3 rounded-full font-normal hidden md:block cursor-pointer'>
              Book Now
            </button>
          </div>
        </div> */
}

{
  /* <div
          aria-label='Photos of clients'
          className='mt-12 grid grid-cols-2 gap-6 pb-6'
        >
          {heroImages.map(({ alt, image }) => (
            <img
              alt={alt}
              className='w-36 h-44 rounded-lg hover:scale-105 transition duration-300 object-cover flex-shrink-0 shadow-lg'
              height='140'
              src={image}
              width='120'
            />
          ))}
        </div> */
}
{
  /* </div> */
}
// </section>

export default Hero;
