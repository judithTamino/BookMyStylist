import { useState, type FunctionComponent } from 'react';
import Button from '../../UI/Button/Button';
import SideMenu from './SideMenu';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../../context/theme.context';
import { useAuth } from '../../../context/auth.context';

interface AdminNavbarProps {}

const AdminNavbar: FunctionComponent<AdminNavbarProps> = () => {
  const { theme, changeTheme } = useTheme();
  const { token, logout } = useAuth();

  const themeIcon = theme ? 'ri-moon-line' : 'ri-sun-line';

  return (
    <div className='flex items-center justify-between py-4 px-7 sticky top-0 z-30'>
      <NavLink
        to='/'
        className='font-playfair text-3xl text-stone-900 dark:text-slate-100'
      >
        SALON
      </NavLink>

      <div className='flex items-center justify-between'>
        <Button variant='text' size='lg' onClick={changeTheme}>
          <i className={themeIcon} />
        </Button>

        {token ? (
          <Button size='sm' onClick={logout}>
            <i className='ri-logout-box-line' />
            <span className='hidden md:block'> Logout</span>
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default AdminNavbar;
