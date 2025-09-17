import { useEffect, useState, type FunctionComponent } from 'react';
import { useAuth } from '../../../context/auth.context';
import { getUserProfile } from '../../../services/user.service';
import decodeToken from '../../../services/token.service';
import { errorMsg } from '../../../services/toastify.service';
import type { IUser } from '../../../interface/user.interface';
import { adminLinks } from '../../../assets/assets';
import { NavLink } from 'react-router-dom';

interface SideMenuProps {}

const SideMenu: FunctionComponent<SideMenuProps> = () => {
  const [adminInfo, setAdminInfo] = useState<IUser>();

  const { token, logout } = useAuth();
  const admin = token ? decodeToken(token) : null;

  useEffect(() => {
    getUserProfile(admin?._id as string, token as string)
      .then((res) => setAdminInfo(res.data.data))
      .catch((error) => errorMsg(error.response.data.msg));
  }, []);

  return (
    <div className='w-64 h-[calc(100vh-90px)] bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 sticky top-[61px] z-20'>
      {adminInfo && (
        <>
          <div className='flex flex-col items-center justify-center mb-7 pt5'>
            <div className='relative'>
              <div className='w-20 h-20 bg-rose-600/10 rounded-full flex items-center justify-center'>
                <i className='ri-user-smile-line text-rose-600 text-5xl' />
              </div>
            </div>

            <div className='text-xs font-medium text-white bg-rose-600 px-3 py-0.5 rounded mt-2'>
              Admin
            </div>

            <h5 className='font-medium leading-6 mt-4 capitalize'>
              {adminInfo.name}
            </h5>

            <p className='text-slate-700 dark:text-slate-400 text-sm'>
              {adminInfo.email}
            </p>
          </div>

          {adminLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `w-full flex items-center gap-4 text-base py-3 px-6 mb3  ${
                  isActive
                    ? 'text-rose-600 bg-rose-600/10 border-r-3'
                    : 'text-slate-900 dark:text-slate-100 hover:text-rose-600'
                }`
              }
            >
              <i className={`${link.icon} text-xl`} />
              {link.name}
            </NavLink>
          ))}
        </>
      )}
    </div>
  );
};

export default SideMenu;
