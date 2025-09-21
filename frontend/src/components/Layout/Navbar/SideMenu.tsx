import { type FunctionComponent } from 'react';
import { adminLinks } from '../../../assets/assets';
import { NavLink } from 'react-router-dom';

interface SideMenuProps {}

const SideMenu: FunctionComponent<SideMenuProps> = () => {
  return (
    <>
      {adminLinks.map((link, index) => (
        <NavLink
          key={index}
          to={link.path}
          className={({ isActive }) =>
            `w-full flex items-center gap-4 text-base py-3 px-6 mb-3  ${
              isActive
                ? 'text-rose-600 bg-rose-600/10 border-r-3'
                : 'text-slate-900 dark:text-slate-100 hover:text-rose-600'
            }`
          }
        >
          <i className={`${link.icon} text-xl`} />
          <p className='md:block hidden text-center'>{link.name}</p>
        </NavLink>
      ))}
    </>
  );
};

export default SideMenu;
