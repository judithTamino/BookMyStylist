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
        <Sidebar />
        <div className='grow mx-4 md:mx-5 p-4'>{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
