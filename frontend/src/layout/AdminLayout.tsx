import type { FunctionComponent, ReactNode } from 'react';
import AdminNavbar from '../components/Layout/Navbar/AdminNavbar';
import SideMenu from '../components/Layout/Navbar/SideMenu';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FunctionComponent<AdminLayoutProps> = (props) => {
  const { children } = props;

  return (
    <>
      <AdminNavbar />

      <div className='flex'>
        <div className='md:w-64 w-16 text-base pt-4 flex flex-col transition-all duration-300'>
          <SideMenu />
        </div>

        <div className='grow mx-4 md:mx-5'>{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
