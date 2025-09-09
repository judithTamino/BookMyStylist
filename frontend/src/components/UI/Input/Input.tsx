import { useState, type InputHTMLAttributes, type ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'outlined' | 'underline';
  sizes?: 'sm' | 'md' | 'lg';
  error?: string;
  helperTxt?: string;
}

const Input = ({
  label,
  type,
  leftIcon,
  rightIcon,
  sizes = 'md',
  variant = 'outlined',
  helperTxt,
  error,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const hasError = !!error;
  const passwordIcon = showPassword ? 'ri-eye-line' : 'ri-eye-close-line';

  const inputSize = {
    sm: 'text-sm py-1.5',
    md: 'text-base py-2',
    lg: 'text-lg py-3',
  };

  const inputVariant = {
    underline: 'border-b rounded-none',
    outlined: 'rounded border',
  };

  const borderColor = hasError
    ? 'border-red-500'
    : 'border-slate-300 dark:border-slate-600';

  return (
    <div className='flex flex-col gap-1 w-full'>
      {label && (
        <label
          htmlFor={props.name}
          className='text-sm font-medium text-slate-700 dark:text-slate-400'
        >
          {label}
        </label>
      )}

      <div
        className={`flex items-center px-3 bg-slate-50 dark:bg-slate-900 transition ${inputSize[sizes]} ${borderColor} ${inputVariant[variant]}`}
      >
        {leftIcon && <span className='mr-2 text-rose-600'>{leftIcon}</span>}

        <input
          {...props}
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          className='flex-1 bg-transparent outline-none text-slate-900 dark:text-slate-100'
        />

        {type === 'password' ? (
          <i
            onClick={() => setShowPassword((prev) => !prev)}
            className={`${passwordIcon} cursor-pointer text-rose-600 hover:text-rose-700 dark:hover:text-rose-500`}
          />
        ) : (
          rightIcon && <span className='ml-2 text-rose-600'>{rightIcon}</span>
        )}
      </div>

      {hasError ? (
        <p className='text-xs text-red-500'>{error}</p>
      ) : (
        helperTxt && (
          <p className='text-xs text-slate-700 dark:text-slate-400'>
            {helperTxt}
          </p>
        )
      )}
    </div>
  );
};

export default Input;
