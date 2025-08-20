import type { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

interface DesktopNavbarProps {
  navLinks: Record<string, string>[];
}

const DesktopNavbar: FunctionComponent<DesktopNavbarProps> = ({ navLinks }) => {
  return (
    <ul className='hidden md:flex items-center space-x-8 md:pl-28'>
      {navLinks.map(({ name, path }) => (
        <li key={name} className='border-b-4 border-double border-stone-50 dark:border-neutral-800 hover:border-pink-200 dark:hover:border-t-pink-300'>
          <NavLink to={path} className='py-1'>
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default DesktopNavbar;
