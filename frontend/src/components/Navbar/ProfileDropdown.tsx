import type { FunctionComponent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavLink } from 'react-router-dom';

interface ProfileDropdownProps {}

const navLinks = [
  { name: 'My Profile', path: '/my-profile' },
  { name: 'My Appointments', path: '/my-appointments' },
  { name: 'Favorites', path: '/favorites' },
];

const ProfileDropdown: FunctionComponent<ProfileDropdownProps> = () => {
  const { logout } = useAuth();

  return (
    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
      <div className='min-w-48 bg-gray-50 dark:bg-stone-900 rounded flex flex-col gap-4 p-4'>
        {navLinks.map(({ name, path }) => (
          <NavLink
            to={path}
            key={name}
            className='hover:text-black dark:text-white dark:hover:text-neutral-100'
          >
            {name}
          </NavLink>
        ))}

        <p className="text-red-500" onClick={logout}>
          Logout
        </p>
      </div>
    </div>
  );
};

export default ProfileDropdown;
