import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../UI/Button/PrimaryButton';

interface CtaProps {}

const Cta: FunctionComponent<CtaProps> = () => {
  const navigate = useNavigate();

  return (
    <section className='py-16 text-center'>
      <div className='py-16 md:pl-20 md:w-full flex flex-col items-center justify-between text-left bg-slate-800 dark:bg-slate-700 rounded-2xl p-10 text-slate-100'>
        <div>
          <h1 className='text-4xl md:text-[46px] md:leading-[60px] font-semibold font-playfair mb-5 text-slate-100'>
            Your Beauty, Your Way
          </h1>
          <p className='text-lg text-slate-400 mb-8'>
             With SALON, looking and feeling your best has never been simpler.
          </p>
        </div>
          <PrimaryButton
            onClick={() => navigate('/services')}
            label='Book Now'
          />
      </div>
    </section>
  );
};

export default Cta;
