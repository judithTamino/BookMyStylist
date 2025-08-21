import type { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

interface DesktopNavbarProps {
  navLinks: Record<string, string>[];
}

const DesktopNavbar: FunctionComponent<DesktopNavbarProps> = ({ navLinks }) => {
  return (
    <ul className='hidden md:flex items-center space-x-8 md:pl-28'>
      {navLinks.map(({ name, path }) => (
        <li key={name} className='text-slate-900 dark:text-slate-100 hover:text-indigo-600'>
          <NavLink to={path} className='py-1'>
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default DesktopNavbar;
