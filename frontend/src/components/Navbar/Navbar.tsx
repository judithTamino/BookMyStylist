import { useEffect, useState, type FunctionComponent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// context
import { useAuth } from '../../context/auth.context';
import { useTheme } from '../../context/ThemeContext';

// components
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import ProfileDropdown from './ProfileDropdown';
import Button from '../Button/Button';

interface NavbarProps {}

const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'ABOUT', path: '/about' },
  { name: 'SERVICES', path: '/services' },
  { name: 'CONTACT', path: '/contact' },
];

const Navbar: FunctionComponent<NavbarProps> = () => {
  const { token, login } = useAuth();
  const { theme, changeTheme } = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleMenu = () => setOpen((prev) => !prev);
  const toggleProfile = () => setOpenProfile((prev) => !prev);

  useEffect(() => {
    const sessionToken = sessionStorage.getItem('token');
    if (sessionToken) login(sessionToken);
  }, []);

  const LoggedUser = () => (
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

  const ThemeBtn = () => (
    <button
      onClick={changeTheme}
      className='dark:text-slate-100 size-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-900 transition border border-slate-300 rounded-md cursor-pointer'
    >
      {theme ? <i className='ri-moon-line' /> : <i className='ri-sun-line' />}
    </button>
  );

  return (
    <header className='fixed top-0 right-0 left-0 z-50 bg-white dark:bg-slate-950 mb-4'>
      <nav className='h-[70px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-slate-900 dark:text-slate-100 transition-all'>
        <NavLink
          to='/'
          className='font-playfair text-2xl text-stone-200 dark:text-slate-700'
        >
          SALON
        </NavLink>

        <DesktopNavbar navLinks={navLinks} />
        <MobileNavbar open={open} navLinks={navLinks} />

        <div className='flex items-center gap-4'>
          <ThemeBtn />

          {token ? (
            <LoggedUser />
          ) : (
            <div className='hidden md:flex'>
              <Button onClick={() => navigate('/register')} label='sign up' />
            </div>
          )}

          <button
            onClick={toggleMenu}
            className='sm:hidden cursor-pointer text-slate-400 dark:text-slate-700'
          >
            <i className='ri-menu-3-line text-xl' />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
