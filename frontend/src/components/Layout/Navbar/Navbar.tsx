import { useState, type FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useTheme } from '../../../context/ThemeContext';
import type { ILoggedUserProps } from '../../../interface/auth.interface';

import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import ButtonIcon from '../../UI/Button/ButtonIcon';
import ProfileDropdown from './ProfileDropdown';
import PrimaryButton from '../../UI/Button/PrimaryButton';

const LoggedUser: FC<ILoggedUserProps> = ({ toggleProfile, openProfile }) => (
  <div className='flex items-center justify-center gap-2 group relative cursor-pointer w-8 h-8 rounded-full bg-rose-600/10 dark:bg-rose-600/50'>
    <i onClick={toggleProfile} className='ri-user-smile-line text-rose-600' />
    <ProfileDropdown open={openProfile} toggleProfile={toggleProfile} />
  </div>
);

const Navbar = () => {
  const token: boolean = true;
  const { theme, changeTheme } = useTheme();
  const navigate = useNavigate();

  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsMobileOpen((prev) => !prev);
  const toggleProfile = () => setIsProfileOpen((prev) => !prev);

  const themeIcon = theme ? 'ri-moon-line' : 'ri-sun-line';

  return (
    <header className='fixed top-0 inset-x-0 z-50 bg-white dark:bg-slate-950 mb-4'>
      <nav className='h-[70px] flex items-center justify-between px-10 md:px-16 lg:px-24 xl:px-32 py-4 text-slate-900 dark:text-slate-100 transition-all'>
        <NavLink
          to='/'
          className='font-playfair text-2xl text-stone-900 dark:text-slate-100'
        >
          SALON
        </NavLink>

        <DesktopNavbar />
        <MobileNavbar open={isMobileOpen} />

        <div className='flex items-center gap-4'>
          <ButtonIcon onClick={changeTheme}>
            <i className={themeIcon} />
          </ButtonIcon>

          {token ? (
            <LoggedUser
              openProfile={isProfileOpen}
              toggleProfile={toggleProfile}
            />
          ) : (
            <div className='hidden md:flex'>
              <PrimaryButton label='Login' onClick={() => navigate('/login')} />
            </div>
          )}

          <button
            onClick={toggleMenu}
            className='md:hidden cursor-pointer text-rose-600'
            aria-label='Toggle mobile menu'
          >
            <i className='ri-menu-3-line text-xl' />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
