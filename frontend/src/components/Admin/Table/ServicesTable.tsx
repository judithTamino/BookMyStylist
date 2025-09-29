import { useState, type FunctionComponent } from 'react';
import type { IService } from '../../../interface/service.interface';
import Search from '../../UI/Input/Search';

interface ServicesTableProps {
  services: IService[];
}

const ServicesTable: FunctionComponent<ServicesTableProps> = (props) => {
  const { services } = props;

  const [search, setSearch] = useState<string>('');
  const getStatusBadgeColor = (active: boolean) =>
    active
      ? 'bg-emerald-600/20 text-emerald-600 border border-emerald-600/30'
      : 'bg-rose-600/20 text-rose-600 border border-rose-600/30';

  return (
    // <div className='overflow-x-auto p-0 rounded-lg mt-3'>
    //   <table className='min-w-full divide-y divide-slate-200 dark:divide-slate-800'>
    //     <thead className='bg-slate-50 dark:bg-slate-900'>
    //       <tr className=''>
    //         <th className='table-head'> name </th>
    //         <th className='table-head hidden xl:table-column'>category</th>
    //         <th className='table-head hidden xl:table-column'>duration</th>
    //         <th className='table-head'>price</th>
    //         <th className='table-head'>status</th>
    //         <th className='table-head'>actions</th>
    //       </tr>
    //     </thead>

    //     <tbody className='divide-y divide-slate-200 dark:divide-slate-800'>
    //       {services.map((service) => (
    //         <tr className=''>
    //           <td className=''>{service.name}</td>
    //           <td className=''>{service.category}</td>
    //           <td className=''>{service.duration}</td>
    //           <td className=''>{service.price}</td>
    //           <td className=''>
    //             <span
    //               className={`rounded-md px-4 py-px text-xs font-semibold antialiased ${getStatusBadgeColor(
    //                 service.active
    //               )}`}
    //             >
    //               {service.active ? 'active' : 'Inactive'}
    //             </span>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>

    <div className='flex flex-col'>
      <div className='-m-1.5 overflow-x-auto'>
        <div className='p-1.5 min-w-full inline-block align-middle'>
          <div className='bg-white dark:bg-slate-950 border border-slate-200 rounded-lg divide-y divide-slate-200 dark:border-slate-800 dark:divide-slate-800'>
            <div className='py-3 px-4 flex flex-col items-start justify-normal md:flex-row md:justify-between md:items-center'>
              <h3 className='text-lg capitalize font-semibold my-4 md:text-2xl lg:text-3xl'>all services {`(${services.length})`}</h3>
              <div className='relative max-w-xs mb-6'>
                <Search setSearch={setSearch} />
              </div>
            </div>

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
                  {services.map((service) => (
                    <tr className=''>
                      <td className='table-col line-clamp-2 sm:line-clamp-1 overflow-hidden'>{service.name}</td>
                      <td className='table-col text-nowrap hidden lg:table-cell'>{service.category}</td>
                      <td className='table-col text-nowrap hidden md:table-cell'>{service.duration}</td>
                      <td className='table-col text-nowrap hidden sm:table-cell'>{service.price}</td>
                      <td className='table-col'>
                        <span
                          className={`rounded-md px-4 py-px text-xs font-semibold antialiased ${getStatusBadgeColor(
                            service.active
                          )}`}
                        >{service.active ? 'active' : 'Inactive'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesTable;
