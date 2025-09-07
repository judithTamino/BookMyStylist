import type { FunctionComponent } from 'react';

interface HeroProps {}

const Hero: FunctionComponent<HeroProps> = () => {
  return (
    <section className='py-20 px-6 text-center'>
      <img
        src='/about.jpg'
        alt='Hairdresser profile image'
        className='w-40 h-40 rounded-full mx-auto mb-6 object-cover shadow-lg'
      />

      <h1 className='text-4xl md:text-5xl font-bold mb-4 font-playfair'>Hi, I`m Judith </h1>
      <p className='text-lg max-w-2xl mx-auto'>
        With over 10 years of hairstyling experience, I help clients look and
        feel their absolute best through personalized cuts, colors, and styles.
      </p>
    </section>
  );
};

export default Hero;
