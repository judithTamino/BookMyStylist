import type { FunctionComponent } from 'react';
import NavLinks from './NavLinks';

interface DesktopNavbarProps {
  navLinks: Record<string, string>[];
}

const DesktopNavbar: FunctionComponent<DesktopNavbarProps> = ({ navLinks }) => {
  return (
    <ul className='hidden md:flex items-center space-x-8 md:pl-28'>
      <NavLinks links={navLinks} />
    </ul>
  );
};

export default DesktopNavbar;
