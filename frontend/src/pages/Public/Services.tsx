import { useEffect, useMemo, useState } from 'react';

import MainLayout from '../../layout/MainLayout';
import Search from '../../components/UI/Input/Search';

import {
  getActiveServices,
  LikeUnlikeService,
} from '../../services/services.service';
import type { IService } from '../../interface/service.interface';
import ServiceCard from '../../components/Booking/Card/ServiceCard';
import Dropdown from '../../components/UI/Input/Dropdown';
import { errorMsg } from '../../services/toastify.service';
import { useAuth } from '../../context/auth.context';

const Services = () => {
  const [search, setSearch] = useState<string>('');
  const [services, setServices] = useState<IService[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [liked, setLiked] = useState<boolean>(false);

  const { token } = useAuth();

  const handleLikeToggle = (serviceId: string) => {
    LikeUnlikeService(serviceId, token as string)
      .then(() => setLiked((prev) => !prev))
      .catch((error) => errorMsg(error.response.data.msg));
  };

  const categories = useMemo(
    () => [
      'all',
      ...new Set(services.map((service: IService) => service.category)),
    ],
    [services]
  );

  const filterServices = useMemo(() => {
    return services.filter((service) => {
      const filterByCategory =
        selectedCategory === 'all' ||
        service.category.toLowerCase() === selectedCategory.toLowerCase();

      const filterByName = service.name
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());

      return filterByCategory && filterByName;
    });
  }, [services, search, selectedCategory]);

  useEffect(() => {
    getActiveServices()
      .then((res) => {
        setServices(res.data.data);
      })
      .catch((error) => errorMsg(error.response.data.msg));
  }, [liked]);

  return (
    <MainLayout>
      <article className='py-20 px-6'>
        <h2 className='section-title'>Services</h2>

        <section className='py-8 flex flex-col'>
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
              <ServiceCard
                service={service}
                likeToggle={handleLikeToggle}
                key={service._id}
              />
            ))}
          </section>
        ) : (
          <div className='pt-20 pb-6 mb-8'>
            <p className='text-3xl md:text-6xl'>SERVICES NOT FOUND</p>
          </div>
        )}
      </article>
    </MainLayout>
  );
};

export default Services;
