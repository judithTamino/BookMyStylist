import type { FunctionComponent, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='flex h-[450px] w-full my-32'>
      <div className='w-full flex flex-col items-center justify-center px-12 pt-8 pb-12'>
        {children}
      </div>

      <div className="w-full hidden md:inline-block bg-amber-50 dark:bg-amber-900 bg-[url('/auth.jpg')] bg-cover bg-top overflow-hidden p-4 rounded-2xl"/>

    </div>
  );
};

export default AuthLayout;