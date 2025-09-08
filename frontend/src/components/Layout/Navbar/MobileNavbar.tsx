import type { FunctionComponent } from 'react';
import NavLinks from './NavLinks';

interface MobileNavbarProps {
  open: boolean;
}

const MobileNavbar: FunctionComponent<MobileNavbarProps> = ({ open }) => {
  return (
    <div
      className={`${
        open ? 'flex' : 'hidden'
      } absolute top-[60px] left-0 w-full bg-white dark:bg-slate-950 shadow-xs py-4 flex-col items-start gap-6 px-5 text-sm lg:hidden z-40 transition-all duration-300`}
    >
      <NavLinks />
    </div>
  );
};

export default MobileNavbar;
