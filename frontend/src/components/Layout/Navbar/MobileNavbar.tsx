import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import NavLinks from './NavLinks';
import PrimaryButton from '../../UI/Button/PrimaryButton';

interface MobileNavbarProps {
  open: boolean;
}

const MobileNavbar: FunctionComponent<MobileNavbarProps> = ({ open }) => {
  const navigate = useNavigate();

  const handleLogin = () => navigate('/login');

  return (
    <div
      className={`${
        open ? 'flex' : 'hidden'
      } absolute top-[60px] left-0 w-full bg-white dark:bg-slate-950 shadow-xs py-4 flex-col items-start gap-6 px-5 text-sm md:hidden z-40 transition-all duration-300`}
    >
      <NavLinks />

      <PrimaryButton onClick={handleLogin} label='Login' />
    </div>
  );
};

export default MobileNavbar;
