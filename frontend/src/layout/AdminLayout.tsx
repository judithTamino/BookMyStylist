import type { FunctionComponent, ReactNode } from 'react';
import AdminNavbar from '../components/Layout/Navbar/AdminNavbar';
import SideMenu from '../components/Layout/Navbar/SideMenu';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FunctionComponent<AdminLayoutProps> = (props) => {
  const { children } = props;

  return (
    <div className=''>
      <AdminNavbar />

      <div className='flex'>
        <div className='max-[1080px]:hidden'>
          <SideMenu />
        </div>

        <div className='grow mx-5'>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
