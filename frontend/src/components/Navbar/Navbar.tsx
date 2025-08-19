import { useState, type FunctionComponent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
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

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <nav className='flex items-center justify-end md:justify-between text-sm py-4 mb-5 border-b border-gray-400 '>
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
  );
};

export default Navbar;
