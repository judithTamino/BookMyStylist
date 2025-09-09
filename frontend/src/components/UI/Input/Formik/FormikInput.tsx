import type { FunctionComponent } from 'react';
import Input from '../Input';
import { useField } from 'formik';

interface FormikInputProps {
  name: string;
  label?: string;
  type?: string;
  helperTxt?: string;
  variant?: 'outlined' | 'underline';
  sizes?: 'sm' | 'md' | 'lg';
}

const FormikInput: FunctionComponent<FormikInputProps> = ({
  name,
  ...props
}) => {
  const [field, meta] = useField(name);
  return (
    <Input
      {...field}
      {...props}
      error={meta.touched && meta.error ? meta.error : undefined}
    />
  );
};

export default FormikInput;
