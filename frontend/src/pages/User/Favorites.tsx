import { useEffect, useMemo, useState, type FunctionComponent } from 'react';
import MainLayout from '../../layout/MainLayout';
import { getActiveServices, LikeUnlikeService } from '../../services/services.service';
import { errorMsg } from '../../services/toastify.service';
import type { IService } from '../../interface/service.interface';
import Loader from '../../components/UI/Loader/Loader';
import { useAuth } from '../../context/auth.context';
import decodeToken from '../../services/token.service';
import Button from '../../components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../../components/UI/EmptyState/EmptyState';
import ServiceCard from '../../components/Booking/Card/ServiceCard';

interface FavoritesProps {}

const Favorites: FunctionComponent<FavoritesProps> = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [liked, setLiked] = useState<boolean>(false);

  const { token } = useAuth();
  const navigate = useNavigate();

  const likedService = useMemo(() => {
    const decoded = token ? decodeToken(token) : null;
    return services.filter((service) => {
      const byLike = service.likes?.includes(decoded?._id as string);

      return byLike;
    });
  }, [services]);

  const handleLikeToggle = (serviceId: string) => {
    LikeUnlikeService(serviceId, token as string)
      .then(() => setLiked((prev) => !prev))
      .catch((error) => errorMsg(error.response.data.msg));
  };

  useEffect(() => {
    getActiveServices()
      .then((res) => {
        setServices(res.data.data);
        setLoading(false);
      })
      .catch((error) => errorMsg(error.response.data.msg));
  }, [liked]);

  return (
    <MainLayout>
      <section className='py-30 md:py-40'>
        <h2 className='section-title'>My Fav Services</h2>

        {likedService.length > 0 ? (
          <div className='py-10 grid lg:grid-cols-2 gap-x-18 gap-y-12 lg:gap-y-14'>
            {likedService.map((service) => (
              <ServiceCard service={service} likeToggle={handleLikeToggle} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon='ri-heart-3-line'
            title='No favorite services yet'
            message='Browse our services and tap the heart icon to save your favorites.'
            action={
              <Button size='sm' onClick={() => navigate('/services')}>
                Explore Services
              </Button>
            }
          />
        )}

        <div className='flex justify-center'>
          <Loader loading={loading} />
        </div>
      </section>
    </MainLayout>
  );
};

export default Favorites;
