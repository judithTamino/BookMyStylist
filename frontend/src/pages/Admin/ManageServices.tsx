import { useEffect, useMemo, useState, type FunctionComponent } from 'react';
import type { IService } from '../../interface/service.interface';
import AdminLayout from '../../layout/AdminLayout';
import { getAllServices } from '../../services/services.service';
import { useAuth } from '../../context/auth.context';
import { errorMsg } from '../../services/toastify.service';
import ServicesTable from '../../components/Admin/Table/ServicesTable';
import Search from '../../components/UI/Input/Search';
import Button from '../../components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';

interface ManageServicesProps {}

const ManageServices: FunctionComponent<ManageServicesProps> = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [search, setSearch] = useState<string>('');

  const { token } = useAuth();
  const navigate = useNavigate();

  const filterServices = useMemo(() => {
    return services.filter((service) => {
      const filterByName = service.name
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase());

      return filterByName;
    });
  }, [services, search]);

  useEffect(() => {
    getAllServices(token as string)
      .then((res) => setServices(res.data.data))
      .catch((error) => errorMsg(error.response.data.msg));
  }, []);

  return (
    <AdminLayout>
      <section className=''>
        <div className='card flex justify-between'>
          <div>
            <h2 className='text-2xl md:text-4xl font-bold mb-2'>
              Manage Services
            </h2>
            <p className='text-sm md:text-base text-slate-700 dark:text-slate-400'>
              Add, edit and delete your salon`s service offerings
            </p>
          </div>

          <div className='self-start'>
            <Button size='sm' onClick={() => navigate('/admin/add-service')}>
              <i className='ri-add-line' />
              <span className="hidden sm:block">Add New Service</span>
              </Button>
          </div>
        </div>

        <div className='card mt-4 flex flex-col'>
          <div className='-m-1.5 overflow-x-auto'>
            <div className='p-1.5 min-w-full inline-block align-middle'>
              <div className='bg-white dark:bg-slate-950 border border-slate-200 rounded-lg divide-y divide-slate-200 dark:border-slate-800 dark:divide-slate-800'>
                <div className='py-3 px-4 flex flex-col items-start md:flex-row md:justify-between md:items-center'>
                  <h3 className='text-lg capitalize font-semibold my-4 md:text-2xl lg:text-3xl'>
                    all services {`(${services.length})`}
                  </h3>
                  <div className='max-w-xs'>
                    <Search setSearch={setSearch} size='sm' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ServicesTable services={filterServices} />
        </div>
      </section>
    </AdminLayout>
  );
};

export default ManageServices;
