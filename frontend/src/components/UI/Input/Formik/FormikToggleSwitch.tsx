import { useField } from 'formik';
import type { FunctionComponent } from 'react';
import ToggleSwitch from '../ToggleSwitch';

interface FormikToggleSwitchProps {
  name: string;
  text: string;
  helperTxt?: string;
}

const FormikToggleSwitch: FunctionComponent<FormikToggleSwitchProps> = (
  props
) => {
  const { name, text, helperTxt } = props;
  const [field, meta, helpers] = useField(name);

  const hasError = meta.touched && meta.error;

  return (
    <ToggleSwitch
      text={text}
      checked={field.value}
      onChecked={(val) => helpers.setValue(val)}
      error={hasError ? meta.error : undefined}
      helperTxt={helperTxt}
    />
  );
};

export default FormikToggleSwitch;
