import { useState, type FunctionComponent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

// context
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

// components
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import ProfileDropdown from './ProfileDropdown';

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

  return (
    <div className='text-sm text-stone-50 dark:text-neutral-800 w-full cursor-pointer'>
      <div
        onClick={() => navigate('/book-appointment')}
        className='text-center font-medium py-2 bg-neutral-800 dark:bg-stone-50'
      >
        <p>
          book your hair appointment{' '}
          <span className='underline underline-offset-2'>now</span>
        </p>
      </div>

      <nav className='relative h-[70px] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-neutral-800 transition-all'>
        <NavLink
          to='/'
          className='p-2 text-2xl hover:text-pink-300 dark:hover:text-pink-400 text-pink-200 dark:text-pink-300 transition-all transition-discrete'
        >
          SALON
        </NavLink>

        <DesktopNavbar navLinks={navLinks} />
        <MobileNavbar open={open} navLinks={navLinks} />

        <div className='flex items-center gap-4'>
          {/* Theme btn */}
          <button
            onClick={changeTheme}
            className='size-8 flex items-center justify-center transition border border-slate-300 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500'
          >
            {theme ? (
              <i className='ri-moon-line' />
            ) : (
              <i className='ri-sun-line' />
            )}
          </button>
          {token ? (
            <div className='flex items-center gap-2 group relative cursor-pointer'>
              <img
                src='/profile-img.png'
                alt='profile'
                className='w-8 rounded-full'
              />
              <ProfileDropdown />
            </div>
          ) : (
            <button className='bg-purple-600 text-white px-8 py-3 rounded-full font-normal hidden md:block cursor-pointer'>
              Create Account
            </button>
          )}
          <button onClick={toggleMenu} className='sm:hidden cursor-pointer'>
            <i className='ri-menu-3-line text-xl' />
          </button>
        </div>
      </nav>
    </div>
    // <nav className='flex items-center justify-end md:justify-between text-sm py-4 mb-5 border-b border-stone-200 '>
    //   <DesktopNavbar navLinks={navLinks} />
    //   <MobileNavbar open={open} navLinks={navLinks} />

    // </nav>
  );
};

export default Navbar;
