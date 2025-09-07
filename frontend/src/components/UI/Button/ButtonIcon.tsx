import type { FunctionComponent, ReactNode } from 'react';

interface ButtonIconProps {
  children: ReactNode;
  onClick: () => void;
}

const ButtonIcon: FunctionComponent<ButtonIconProps> = ({
  children,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className='dark:text-slate-100 size-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-900 transition border border-slate-300 rounded-md cursor-pointer'
    >
      {children}
    </button>
  );
};

export default ButtonIcon;
