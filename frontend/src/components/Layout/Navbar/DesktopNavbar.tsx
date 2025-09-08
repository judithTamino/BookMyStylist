import type { FunctionComponent } from 'react';
import NavLinks from './NavLinks';

interface DesktopNavbarProps {}

const DesktopNavbar: FunctionComponent<DesktopNavbarProps> = () => {
  return (
    <ul className='hidden lg:flex items-center space-x-8 md:pl-28'>
      <NavLinks />
    </ul>
  );
};

export default DesktopNavbar;
