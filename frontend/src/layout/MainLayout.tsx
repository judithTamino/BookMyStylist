import type { FunctionComponent, ReactNode } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Layout/Footer/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className='mx-4 sm:mx-[10%]'>{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
