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

  const passwordIcon = showPassword ? 'ri-eye-line' : 'ri-eye-close-line';

  const toggleShowPassword = () => setShowPassword(!showPassword);
  

  return (
    <div>
      <label
        htmlFor={props.name}
        className='text-[13px] text-slate-700 dark:text-slate-400'
      >
        {label}
      </label>

      <div className='input-box'>
        <input
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          {...field}
          {...props}
          className='w-full bg-transparent outline-none'
        />
        {type === 'password' && (
          <i
            onClick={() => toggleShowPassword()}
            className={`${passwordIcon} text-rose-600 cursor-pointer`}
          />
        )}
      </div>
      {meta.touched && meta.error ? (
        <p className='text-red-500 text-xs pb-2.5'>{meta.error}</p>
      ) : null}
    </div>
  );
};

export default Input;
