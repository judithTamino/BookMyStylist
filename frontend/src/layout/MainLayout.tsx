import type { FunctionComponent, ReactNode } from 'react';
// import Navbar from '../components/Navbar/Navbar';
// import Footer from '../components/Layout/Footer/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => {
  return (
    <>
      {/* <Navbar /> */}
      <div className='text-slate-900 dark:text-slate-100 text-base leading-relaxed'>
        {children}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
