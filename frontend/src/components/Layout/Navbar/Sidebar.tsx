import { type FunctionComponent } from 'react';
import { adminLinks } from '../../../assets/assets';
import { NavLink } from 'react-router-dom';

interface SidebarProps {}

const Sidebar: FunctionComponent<SidebarProps> = () => {
  return (
    <div className='md:w-64 w-16 border-r h-[550px] text-base border-slate-200 dark:border-slate-800 pt-4 flex flex-col transition-all duration-300'>
      {adminLinks.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          className={({ isActive }) =>
            `flex items-center py-3 px-4 gap-3 
                            ${
                              isActive
                                ? 'border-r-4 md:border-r-[6px] bg-rose-600/10 border-rose-600 text-rose-600'
                                : 'hover:bg-slate-100/90 dark:hover:bg-slate-100/10 border-white text-slate-700 dark:text-slate-400'
                            }`
          }
        >
          <i className={`${item.icon}`} />
          <p className='md:block hidden text-center'>{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
