import { useField } from 'formik';
import type { FunctionComponent } from 'react';

interface FormikTextareaProps {
  label?: string;
  variant?: 'outlined' | 'underline';
  sizes?: 'sm' | 'md' | 'lg';
  helperTxt?: string;
  name: string;
}

const FormikTextarea: FunctionComponent<FormikTextareaProps> = (props) => {
  const {
    label,
    name,
    sizes = 'md',
    variant = 'outlined',
    helperTxt,
  } = props;
  const [field, meta] = useField(name);

  const hasError = !!(meta.touched && meta.error);

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
          htmlFor={name}
          className='text-sm font-medium text-slate-700 dark:text-slate-400'
        >
          {label}
        </label>
      )}

      <div
        className={`flex items-center px-3 bg-slate-50 dark:bg-slate-900 transition ${inputSize[sizes]} ${borderColor} ${inputVariant[variant]}`}
      >
        <textarea
          {...field}
          id={name}
          rows={4}
          cols={50}
          className='flex-1 bg-transparent outline-none text-slate-900 dark:text-slate-100'
        />
      </div>
      {hasError ? (
        <p className='text-xs text-red-500'>{meta.error}</p>
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

export default FormikTextarea;
