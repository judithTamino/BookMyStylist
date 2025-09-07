import { useEffect, useMemo, useState, type FunctionComponent } from 'react';

import MainLayout from '../../layout/MainLayout';
import Search from '../../components/UI/Input/Search';

// import { getActiveServices } from '../../services/services.service';
// import type { IService } from '../../interface/service.interface';
// import ServiceCard from '../../components/Service/ServiceCard';
// import Dropdown from '../../components/UI/Input/Dropdown';
// import { errorMsg } from '../../services/toastify.service';

const Services = () => {
  // const [search, setSearch] = useState<string>('');
  // const [services, setServices] = useState<IService[]>([]);
  // const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // const categories = useMemo(
  //   () => [
  //     'all',
  //     ...new Set(services.map((service: IService) => service.category)),
  //   ],
  //   [services]
  // );

  // const filterServices = useMemo(() => {
  //   return services.filter((service) => {
  //     const filterByCategory =
  //       selectedCategory === 'all' ||
  //       service.category.toLowerCase() === selectedCategory.toLowerCase();

  //     const filterByName = service.name
  //       .toLocaleLowerCase()
  //       .includes(search.toLocaleLowerCase());

  //     return filterByCategory && filterByName;
  //   });
  // }, [services, search, selectedCategory]);

  // useEffect(() => {
  //   getActiveServices()
  //     .then((res) => {
  //       setServices(res.data.data);
  //     })
  //     .catch((error) => errorMsg(error.response.data.msg));
  // }, []);

  return (
    <MainLayout>
      Services Page
      {/* <article className='pt-20 pb-6'>
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

          <section className='mb-8 flex flex-col'>
            <Search setSearch={setSearch} />
            <Dropdown
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </section>

          {filterServices.length > 0 ? (
            <section className='max-w-6xl py-10 mx-auto grid lg:grid-cols-2 gap-x-18 gap-y-12 lg:gap-y-14'>
              {filterServices.map((service) => (
                <ServiceCard service={service} key={service._id} />
              ))}
            </section>
          ) : (
            <div className='pt-20 pb-6 mb-8'>
              <p className='text-3xl md:text-6xl'>SERVICES NOT FOUND</p>
            </div>
          )}
        </div>
      </article> */}
    </MainLayout>
  );
};

export default Services;
