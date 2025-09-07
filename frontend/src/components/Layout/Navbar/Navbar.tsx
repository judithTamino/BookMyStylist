import { useState, type FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// context
import { useAuth } from '../../context/auth.context';
import { useTheme } from '../../context/ThemeContext';

// components
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import ProfileDropdown from './ProfileDropdown';
import Button from '../UI/Button/Button';
import ButtonIcon from '../UI/Button/ButtonIcon';
import type { ILoggedUserProps } from '../../interface/auth.interface';

const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'ABOUT', path: '/about' },
  { name: 'SERVICES', path: '/services' },
];

const LoggedUser: FC<ILoggedUserProps> = ({ toggleProfile, openProfile }) => (
  <div className='flex items-center gap-2 group relative cursor-pointer'>
    <img
      src='/profile-img.png'
      alt='profile image'
      onClick={toggleProfile}
      className='w-8 rounded-full'
    />
    <ProfileDropdown open={openProfile} toggleProfile={toggleProfile} />
  </div>
);

const Navbar = () => {
  const { token } = useAuth();
  const { theme, changeTheme } = useTheme();

  const [menu, setMenu] = useState({ mobile: false, profile: false });
  const navigate = useNavigate();

  const toggleMenu = () =>
    setMenu((prev) => ({ ...prev, mobile: !prev.mobile }));
  const toggleProfile = () =>
    setMenu((prev) => ({ ...prev, profile: !prev.profile }));

  return (
    <header className='fixed top-0 right-0 left-0 z-50 bg-white dark:bg-slate-950 mb-4'>
      <nav className='h-[70px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-slate-900 dark:text-slate-100 transition-all'>
        <NavLink
          to='/'
          className='font-playfair text-2xl text-stone-900 dark:text-slate-100'
        >
          SALON
        </NavLink>

        <DesktopNavbar navLinks={navLinks} />
        <MobileNavbar open={menu.mobile} navLinks={navLinks} />

        <div className='flex items-center gap-4'>
          <ButtonIcon onClick={changeTheme}>
            {theme ? (
              <i className='ri-moon-line' />
            ) : (
              <i className='ri-sun-line' />
            )}
          </ButtonIcon>

          {token ? (
            <LoggedUser
              openProfile={menu.profile}
              toggleProfile={toggleProfile}
            />
          ) : (
            <div className='hidden md:flex'>
              <Button onClick={() => navigate('/login')} label='Login' />
            </div>
          )}

          <button
            onClick={toggleMenu}
            className='md:hidden cursor-pointer text-slate-900 dark:text-slate-100'
          >
            <i className='ri-menu-3-line text-xl' />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
