import type { ButtonHTMLAttributes, FunctionComponent, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled,
  ...props
}) => {
  const btnSize = { sm: 'px-3 py-1 text-sm', md: 'px-4 py-2 text-base', lg: 'px-6 py-3 text-lg' };
  const btnVariant = {
    primary:
      'text-slate-100 bg-rose-600 hover:bg-rose-700 dark:hover:bg-rose-500 disabled:bg-rose-300 disabled:cursor-not-allowed dark:disabled:bg-rose-950',
    secondary:
      'border-2 border-rose-600 text-rose-600 hover:bg-rose-600/10 dark:hover:bg-rose-600/40 disabled:border-rose-300 dark:disabled:border-rose-950',
    text: 'text-rose-600 hover:text-rose-700 dark:hover:text-rose-500',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded font-medium transition-colors focus:outline-none cursor-pointer ${btnSize[size]} ${btnVariant[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
