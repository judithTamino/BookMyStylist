import { useState, type FunctionComponent } from 'react';
import Button from '../../UI/Button/Button';
import SideMenu from './SideMenu';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../../context/theme.context';
import { useAuth } from '../../../context/auth.context';

interface AdminNavbarProps {}

const AdminNavbar: FunctionComponent<AdminNavbarProps> = () => {
  const [openSideMenu, setOpenSideMenu] = useState<boolean>(false);
  const { theme, changeTheme } = useTheme();
  const { token, logout } = useAuth();

  const toggleSideMenuIcon = openSideMenu
    ? 'ri-close-large-line'
    : 'ri-menu-2-line';
  const themeIcon = theme ? 'ri-moon-line' : 'ri-sun-line';

  return (
    <div className='flex items-center justify-between gap-5 py-4 px-7 sticky top-0 z-30'>
      <div className='flex items-center'>
        <div className='xl:hidden'>
          <Button
            variant='text'
            size='lg'
            onClick={() => setOpenSideMenu(!openSideMenu)}
          >
            <i className={`${toggleSideMenuIcon}`} />
          </Button>
        </div>

        <NavLink
          to='/'
          className='font-playfair text-2xl text-stone-900 dark:text-slate-100'
        >
          SALON
        </NavLink>
      </div>

      <div className='flex items-center justify-between'>
        <Button variant='text' size='lg' onClick={changeTheme}>
          <i className={themeIcon} />
        </Button>
        {token ? (
          <Button size='sm' onClick={logout}>
            <i className='ri-logout-box-line' />
            Logout
          </Button>
        ) : null}
      </div>

      {openSideMenu && (
        <div className='fixed top-[61px] -ml-4 bg-white dark:bg-slate-950'>
          <SideMenu />
        </div>
      )}
    </div>
  );
};

export default AdminNavbar;
