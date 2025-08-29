import { useEffect, useState, type FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import MainLayout from '../../layout/MainLayout';
import Search from '../../components/Input/Search';

import { getActiveServices } from '../../services/services.service';
import type { IService } from '../../interface/service.interface';
import ServiceCard from '../../components/Service/ServiceCard';


interface ServicesProps {}

const Services: FunctionComponent<ServicesProps> = () => {
  const [search, setSearch] = useState<string>('');
  const [services, setServices] = useState<IService[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('Select');

 

  useEffect(() => {
    getActiveServices()
      .then((res) => {
        setServices(res.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const categories = [...new Set(services.map((c: any) => c.category))];

  const handleSelect = (c) => {
    setSelected(c);
    setIsOpen(false);

    getActiveServices(c)
      .then((res) => {
        setServices(res.data.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <MainLayout>
      <article className='pt-20 pb-6'>
        <div className='max-w-5xl mx-6'>
          <section className='mb-8'>
            <h3 className='text-xl uppercase font-semibold text-slate-900 dark:text-slate-100'>
              SERVICES
            </h3>
            <div className='w-24 h-[3px] rounded-full bg-gradient-to-r from-amber-500 to-[#fff4d9]' />
            <p className='text-sm/7 max-w-md mt-3 text-slate-700 dark:text-slate-400'>
              thank you for considering getting your hair done with us :) maybe
              your current stylist is moving away or maybe you just need to move
              on, regardless we're glad you`re here.
            </p>
          </section>

          <section className='mb-8 grid grid-cols-2'>
            <Search setSearch={setSearch} />

            {/* <div className='flex flex-col w-44 text-sm relative'>
              <button
                type='button'
                onClick={() => setIsOpen(!isOpen)}
                className='w-full text-left px-4 pr-2 py-2 border rounded bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none'
              >
                <span>{selected}</span>
                <svg
                  className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                    isOpen ? 'rotate-0' : '-rotate-90'
                  }`}
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='#6B7280'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </button>

              {isOpen && (
                <ul className='w-full bg-white border border-gray-300 rounded shadow-md mt-1 py-2'>
                  {categories.map((c: any) => (
                    <li
                      key={c}
                      className='px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer'
                      onClick={() => handleSelect(c)}
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              )}
            </div> */}
          </section>

          {services.length < 0 ? (
            <section className='max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8'>
              {services.map((service) => (
                <ServiceCard service={service} />
              ))}
            </section>
          ) : (
            <div className="">
              <p className='text-3xl md:text-6xl'>SERVICES NOT FOUND</p>
            </div>
          )}
        </div>
      </article>
    </MainLayout>
  );
};

export default Services;
