import type { FunctionComponent } from 'react';
import { specialties } from '../../assets/assets';

interface SpecialtiesProps {}

const Specialties: FunctionComponent<SpecialtiesProps> = () => {
  return (
    <section className='py-16 px-6'>
        <h2 className='section-title'>Specialties</h2>
     <div className="flex flex-col md:flex-row mb-20">
      {specialties.map(specialty => (
        <div key={specialty.title} className="border border-slate-200 dark:border-slate-800 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-rose-600 hover:text-slate-100 transition-all duration-300 text-slate-700 ">
          <b className="uppercase">{specialty.title}</b>
          <p>{specialty.desc}</p>
        </div>
      ))}
     </div>

    </section>
  );
};

export default Specialties;
