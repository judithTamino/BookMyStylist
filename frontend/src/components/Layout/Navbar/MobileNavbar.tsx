import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button/Button';
import NavLinks from './NavLinks';

interface MobileNavbarProps {
  open: boolean;
  navLinks: Record<string, string>[];
}

const MobileNavbar: FunctionComponent<MobileNavbarProps> = ({
  open,
  navLinks,
}) => {
  const navigate = useNavigate();

  const handleLogin = () => navigate('/login');

  return (
    <div
      className={`${
        open ? 'flex' : 'hidden'
      } absolute top-[60px] left-0 w-full bg-white dark:bg-slate-950 shadow-xs py-4 flex-col items-start gap-6 px-5 text-sm md:hidden z-40 transition-all duration-300`}
    >
      <NavLinks links={navLinks} />

      <Button onClick={handleLogin} label='Login' />
    </div>
  );
};

export default MobileNavbar;
