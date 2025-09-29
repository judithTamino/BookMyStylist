import { useEffect, useState, type FunctionComponent } from 'react';
import type { IService } from '../../interface/service.interface';
import { usePagination } from '../../hooks/usePagination';
import AdminLayout from '../../layout/AdminLayout';
import { getAllServices } from '../../services/services.service';
import { useAuth } from '../../context/auth.context';
import { errorMsg } from '../../services/toastify.service';
import ServicesTable from '../../components/Admin/Table/ServicesTable';
import Pagination from '../../components/UI/Pagination/Pagination';

interface ManageServicesProps {}

const ManageServices: FunctionComponent<ManageServicesProps> = () => {
  const [services, setServices] = useState<IService[]>([]);

  // const {
  //   currentData: currenServices,
  //   onPageChange,
  //   totalItems,
  //   itemsPerPage,
  // } = usePagination<IService>({ data: services, itemsPerPage: 2 });
  const { token } = useAuth();

  useEffect(() => {
    getAllServices(token as string)
      .then((res) => setServices(res.data.data))
      .catch((error) => errorMsg(error.response.data.msg));
  }, []);

  return (
    <AdminLayout>
      <section className=''>
        <div className='card'>
          <h2 className=''>Manage Services</h2>
          <p className=''>
            Add, edit and delete your salon`s service offerings
          </p>
        </div>

        <div className='card mt-4 relative'>
          <ServicesTable services={services} />
        </div>
      </section>
    </AdminLayout>
  );
};

export default ManageServices;
