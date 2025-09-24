import { useState, type FunctionComponent } from 'react';
import Button from '../../UI/Button/Button';
import SideMenu from './Sidebar';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../../context/theme.context';
import { useAuth } from '../../../context/auth.context';
import type { IUser } from '../../../interface/user.interface';
import { getUserProfile } from '../../../services/user.service';
import { errorMsg } from '../../../services/toastify.service';
import decodeToken from '../../../services/token.service';

interface AdminNavbarProps {}

const AdminNavbar: FunctionComponent<AdminNavbarProps> = () => {
  const { theme, changeTheme } = useTheme();
  const { token, logout } = useAuth();

  const themeIcon = theme ? 'ri-moon-line' : 'ri-sun-line';

  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-slate-200 dark:border-slate-800 py-3 bg-white transition-all duration-300 dark:bg-slate-950'>
      <div className='flex items-center gap-2'>
        <NavLink
          to='/'
          className='font-playfair text-2xl md:text-3xl text-stone-900 dark:text-slate-100'
        >
          SALON
        </NavLink>

        <p className='text-xs bg-rose-600 text-slate-100 px-1 py-0.5 rounded'>
          Admin
        </p>
      </div>

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
