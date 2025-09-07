import type { FunctionComponent } from 'react';
import { features } from '../assets/assets';

interface FeatureProps {}

const Feature: FunctionComponent<FeatureProps> = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20 mb-4'>
      {features.map((feature, index) => (
        <div key={index} className='flex flex-col items-center justify-center max-w-80'>
          <div className='flex items-center justify-center p-4 aspect-square bg-slate-50 dark:bg-slate-900 rounded-full'>
            <i className={`${feature.icon} text-indigo-600 dark:text-indigo-500 text-3xl`} />
          </div>

          <div className='mt-5 space-y-2 text-center'>
            <h3 className='text-base font-semibold text-slate-900 dark:text-slate-100'>
              {feature.title}
            </h3>
            <p className='text-sm text-slate-700 dark:text-slate-400'>
              {feature.des}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Feature;
