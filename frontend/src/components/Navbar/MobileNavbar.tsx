import type { FunctionComponent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

interface MobileNavbarProps {
  open: boolean;
  navLinks: Record<string, string>[];
}

const MobileNavbar: FunctionComponent<MobileNavbarProps> = ({
  open,
  navLinks,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${
        open ? 'flex' : 'hidden'
      } absolute top-[60px] left-0 w-full dark:bg-slate-950 shadow-xs py-4 flex-col items-start gap-6 px-5 text-sm md:hidden z-40`}
    >
      {navLinks.map(({ name, path }) => (
        <NavLink
          to={path}
          className='text-slate-900 dark:text-slate-100 hover:text-indigo-600'
        >
          {name}
        </NavLink>
      ))}

      <Button onClick={() => navigate('/register')} label='sign up' />
    </div>
  );
};

export default MobileNavbar;
