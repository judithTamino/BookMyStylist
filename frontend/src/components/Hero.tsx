import type { FunctionComponent } from 'react';

interface HeroProps {}

const Hero: FunctionComponent<HeroProps> = () => {
  return (
    <section className='flex flex-col items-center md:flex-row md:px-16 lg:px-24 xl:px-32 text-sm pb-16 mt-20 mb-4'>
      <div className='flex flex-col lg:flex-row items-center justify-between gap-20 w-full mt-24'>
        <div className='max-md:px-4 lg:w-1/2'>
          <h1 className='text-5xl md:text-[54px] md:leading-[4.7rem] font-semibold max-w-lg bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent font-playfair dark:from-slate-100'>
            Your Personal Hairdresser, Just a Click Away
          </h1>
          <p className='text-sm/7 max-w-md mt-3 text-slate-700 dark:text-slate-400'>
            Looking for a fresh new look or just a quick trim? <br />
            With SALON, you can easily browse services, choose your favorite
            stylist, and book appointments anytime — all in one place.
          </p>
        </div>

        <div className='relative'>
          <img
            className='max-w-md w-full max-h-[560px] rounded-[40px] max-md:px-3 md:mr-10'
            src='/hero.jpg'
            alt=''
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
