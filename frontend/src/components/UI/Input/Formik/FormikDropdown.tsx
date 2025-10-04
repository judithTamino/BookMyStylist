import { useField } from 'formik';
import type { FunctionComponent } from 'react';
import Dropdown from '../Dropdown';

interface FormikDropdownProps {
  name: string;
  categories: string[];
  helperTxt?: string;
}

const FormikDropdown: FunctionComponent<FormikDropdownProps> = (props) => {
  const { name, categories, helperTxt } = props;

  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error;
  return (
    <Dropdown
      categories={categories}
      value={field.value || ''}
      onChange={(val) => helpers.setValue(val)}
      error={hasError ? meta.error : undefined}
      helperTxt={helperTxt}
    />
  );
};

export default FormikDropdown;
