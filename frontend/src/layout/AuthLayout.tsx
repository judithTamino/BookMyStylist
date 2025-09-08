import type { FunctionComponent, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='py-30 md:py-40'>
      <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-2'>
        <div className='flex flex-col justify-center w-full p-6 lg:p-10 xl:p-16'>
          {children}
        </div>
        <div className="w-full h-[500px] hidden md:inline-block bg-rose-600 bg-[url('/auth.jpg')] bg-cover bg-top overflow-hidden p-4 rounded-2xl" />
      </div>
    </div>
  );
};

export default AuthLayout;
