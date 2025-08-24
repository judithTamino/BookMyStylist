import { useState, type FunctionComponent } from 'react';
import { useField } from 'formik';

interface InputProps {
  label: string;
  placeholder: string;
  type: string;
  name: string;
}

const Input: FunctionComponent<InputProps> = ({ label, type, ...props }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [field, meta] = useField(props);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    console.log(showPassword);
  };

  return (
    <div>
      <label
        htmlFor={props.name}
        className='text-[13px] text-slate-700 dark:text-slate-400'
      >
        {label}
      </label>

      <div className='w-full flex justify-between gap-3 text-sm text-slate-900 dark:text-slate-100 bg-slate-100/50 dark:bg-slate-500/50 rounded px-4 py-3 mb-4 mt-3 border border-slate-200 dark:border-slate-500 outline-none'>
        <input
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          {...field}
          {...props}
          className='w-full bg-transparent outline-none'
        />
        {type === 'password' && (
          <>
            {showPassword ? (
              <i
                onClick={() => toggleShowPassword()}
                className='ri-eye-line text-amber-500 cursor-pointer'
              />
            ) : (
              <i
                onClick={() => toggleShowPassword()}
                className='ri-eye-close-line text-amber-500 cursor-pointer'
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
