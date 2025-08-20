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
      } absolute top-[60px] left-0 w-full dark:bg-neutral-800 shadow-xs py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-40`}
    >
      {navLinks.map(({ name, path }) => (
        <NavLink
          to={path}
          className='py-1 dark:text-stone-50 border-b-4 border-double border-stone-50 dark:border-neutral-800 hover:border-pink-200 dark:hover:border-t-pink-300'
        >
          {name}
          <hr className='border-none outline-none h-0.5 bg-purple-500 w-3/5 m-auto hidden' />
        </NavLink>
      ))}

      <button className='bg-pink-200 text-neutral-800 px-8 py-3 mt-20 rounded-full font-normal md:block cursor-pointer'>
        Create Account
      </button>
    </div>
  );
};

export default MobileNavbar;
