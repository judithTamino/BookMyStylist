import { useState, type FunctionComponent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// context
import { useAuth } from '../../context/AuthContext';
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
  const { token } = useAuth();
  const { theme, changeTheme } = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const LoggedUser = () => (
    <div className='flex items-center gap-2 group relative cursor-pointer'>
      <img src='/profile-img.png' alt='profile' className='w-8 rounded-full' />
      <ProfileDropdown />
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
    <div className='text-sm w-full cursor-pointer'>
      <div
        onClick={() => navigate('/book-appointment')}
        className='text-center font-medium py-2 bg-amber-500 text-indigo-600 dark:text-indigo-500'
      >
        <p>
          book your hair appointment{' '}
          <span className='underline underline-offset-2'>now</span>
        </p>
      </div>

      <nav className='relative h-[70px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-slate-900 transition-all'>
        <NavLink
          to='/'
          className='px-2 bg-amber-500 text-xl font-logo text-white'
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
          <button onClick={toggleMenu} className='sm:hidden cursor-pointer text-indigo-600 dark:text-indigo-500'>
            <i className='ri-menu-3-line text-xl' />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
