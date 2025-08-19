import type { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

interface MobileNavbarProps {
  open: boolean;
  navLinks: Record<string, string>[];
}

const MobileNavbar: FunctionComponent<MobileNavbarProps> = ({
  open,
  navLinks,
}) => {
  return (
    <div
      className={`${
        open ? 'flex' : 'hidden'
      } absolute top-[60px] left-0 w-full bg-white dark:bg-gray-800 shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-40`}
    >
      {navLinks.map(({ name, path }) => (
        <NavLink to={path} className='py-1'>
          {name}
          <hr className='border-none outline-none h-0.5 bg-purple-500 w-3/5 m-auto hidden' />
        </NavLink>
      ))}

      <button className='bg-purple-600 text-white px-8 py-3 mt-20 rounded-full font-normal md:block cursor-pointer'>
        Create Account
      </button>
    </div>
  );
};

export default MobileNavbar;
