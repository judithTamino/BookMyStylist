import type { FunctionComponent, ReactNode } from 'react';
import { adminLinks } from '../assets/assets';
import AdminNavbar from '../components/Layout/Navbar/AdminNavbar';
import Sidebar from '../components/Layout/Navbar/Sidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FunctionComponent<AdminLayoutProps> = (props) => {
  const { children } = props;

  return (
    <>
      <AdminNavbar />

      <div className='flex'>
        <div className='max-[1080px]:hidden'>
          <Sidebar />
        </div>
        <div className='grow  md:mx-5 py-4'>{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
