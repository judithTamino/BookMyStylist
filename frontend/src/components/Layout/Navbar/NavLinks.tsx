import type { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { links } from '../../../assets/assets';

interface NavLinksProps {}

const NavLinks: FunctionComponent<NavLinksProps> = () => {
  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          className={({ isActive }) =>
            `p-1 ${
              isActive
                ? 'text-rose-600 font-bold'
                : 'text-slate-900 dark:text-slate-100 hover:text-rose-700 dark:hover:text-rose-500'
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </>
  );
};

export default NavLinks;
