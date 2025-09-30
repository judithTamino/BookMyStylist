import { useState, type FunctionComponent } from 'react';
import type { IService } from '../../../interface/service.interface';
import { usePagination } from '../../../hooks/usePagination';
import Pagination from '../../UI/Pagination/Pagination';

interface ServicesTableProps {
  services: IService[];
}

const ServicesTable: FunctionComponent<ServicesTableProps> = (props) => {
  const { services } = props;

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
              <td className='table-col line-clamp-2 sm:line-clamp-1 overflow-hidden'>
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
    </div>
  );
};

export default ServicesTable;
