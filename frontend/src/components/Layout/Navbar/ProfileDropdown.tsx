import type { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

interface ProfileDropdownProps {
  open: boolean;
  toggleProfile: () => void;
}

const navLinks = [
  { name: 'My Profile', path: '/my-profile' },
  { name: 'My Appointments', path: '/my-appointments' },
  { name: 'Favorites', path: '/my-favorites' },
];

const ProfileDropdown: FunctionComponent<ProfileDropdownProps> = ({
  open,
  toggleProfile,
}) => {
  // const { logout } = useAuth();

  const handleLogout = () => {
    // logout();
    // sessionStorage.removeItem('token');
  };

  const isProfileOpen = open ? 'block' : 'hidden';

  return (
    <div
      className={`absolute top-0 right-0 mt-14 text-base font-medium text-slate-700 z-20 ${isProfileOpen}`}
    >
      <div className='min-w-48 bg-slate-50 dark:bg-slate-900 rounded-2xl flex flex-col gap-4 p-4'>
        {navLinks.map(({ name, path }) => (
          <NavLink
            to={path}
            key={name}
            onClick={toggleProfile}
            className='hover:text-rose-600 dark:text-slate-100'
          >
            {name}
          </NavLink>
        ))}

        <p className='text-rose-600' onClick={() => handleLogout()}>
          Logout
        </p>
      </div>
    </div>
  );
};

export default ProfileDropdown;
