import type { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

interface DesktopNavbarProps {
  navLinks: Record<string, string>[];
}

const DesktopNavbar: FunctionComponent<DesktopNavbarProps> = ({ navLinks }) => {
  return (
    <ul className='hidden md:flex items-start gap-5 font-medium'>
      {navLinks.map(({ name, path }) => (
        <li key={name}>
          <NavLink to={path} className='py-1'>
            {name}
            <hr className='border-none outline-none h-0.5 bg-purple-500 w-3/5 m-auto hidden' />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default DesktopNavbar;
