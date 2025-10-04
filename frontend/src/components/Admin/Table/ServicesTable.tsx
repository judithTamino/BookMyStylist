import { useState, type FunctionComponent } from 'react';
import type { IService } from '../../../interface/service.interface';
import { usePagination } from '../../../hooks/usePagination';
import Pagination from '../../UI/Pagination/Pagination';
import { useAuth } from '../../../context/auth.context';
import Modal from '../../UI/Modal/Modal';
import { deleteService } from '../../../services/services.service';
import { errorMsg, successMsg } from '../../../services/toastify.service';
import EditService from '../EditService';

interface ServicesTableProps {
  services: IService[];
  getServices: () => void;
}

const ServicesTable: FunctionComponent<ServicesTableProps> = (props) => {
  const { services, getServices } = props;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openEditService, setOpenEditService] = useState<boolean>(false);
  const [serviceId, setServiceId] = useState<string>('');
  const [selectedService, setSelectedService] = useState<IService>();
  const { token } = useAuth();

  const {
    currentData: currenServices,
    onPageChange,
    totalItems,
    itemsPerPage,
  } = usePagination<IService>({ data: services, itemsPerPage: 6 });

  const getStatusBadgeColor = (active: boolean) =>
    active
      ? 'bg-emerald-600/20 text-emerald-600 border border-emerald-600/30'
      : 'bg-rose-600/20 text-rose-600 border border-rose-600/30';

  const handleDeleteService = () => {
    deleteService(token as string, serviceId)
      .then((res) => {
        successMsg(res.data.msg);
        setOpenModal(false);
        getServices();
      })
      .catch((error) => errorMsg(error.response.data.msg));
  };

  return (
    <div className='overflow-x-auto p-0'>
      <table className='min-w-full divide-y divide-slate-200 dark:divide-slate-800'>
        <thead className='bg-slate-50 dark:bg-slate-900'>
          <tr className=''>
            <th className='table-head'> name </th>
            <th className='table-head hidden lg:table-cell'>category</th>
            <th className='table-head hidden md:table-cell'>duration</th>
            <th className='table-head hidden sm:table-cell'>price</th>
            <th className='table-head'>status</th>
            <th className='table-head'>actions</th>
          </tr>
        </thead>

        <tbody className='divide-y divide-slate-200 dark:divide-slate-800'>
          {currenServices.map((service) => (
            <tr key={service._id}>
              <td className='table-col line-clamp-2 sm:line-clamp-1 overflow-hidden text-left'>
                {service.name}
              </td>
              <td className='table-col text-nowrap hidden lg:table-cell'>
                {service.category}
              </td>
              <td className='table-col text-nowrap hidden md:table-cell'>
                {service.duration}
              </td>
              <td className='table-col text-nowrap hidden sm:table-cell'>
                {service.price}
              </td>
              <td className='table-col'>
                <span
                  className={`rounded-md px-4 py-px text-xs font-semibold antialiased ${getStatusBadgeColor(
                    service.active
                  )}`}
                >
                  {service.active ? 'active' : 'Inactive'}
                </span>
              </td>

              <td className='table-col'>
                <i
                  onClick={() => {
                    setOpenModal(true);
                    setServiceId(service._id as string);
                  }}
                  className='ri-delete-bin-line mr-8 text-lg text-red-500 cursor-pointer'
                />
                <i
                  className='ri-edit-box-line text-lg text-slate-700 dark:text-slate-400 cursor-pointer'
                  onClick={() => {
                    setOpenEditService(true);
                    setSelectedService(service);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className=''>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          handlePageChange={onPageChange}
        />
      </div>

      <Modal
        open={openModal}
        variant='danger'
        icon={<i className='ri-delete-bin-line text-red-500' />}
        title='Are you sure?'
        contect={` Do you really want to continue? This action cannot be undone.`}
        cancelBtn={() => setOpenModal(false)}
        primaryBtn={() => handleDeleteService()}
      />

      <EditService
        open={openEditService}
        close={() => setOpenEditService(false)}
        service={selectedService}
        onEdit={getServices}
      />
    </div>
  );
};

export default ServicesTable;
