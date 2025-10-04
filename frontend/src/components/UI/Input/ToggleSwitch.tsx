import type { FunctionComponent } from 'react';

interface ToggleSwitchProps {
  text: string;
  checked: boolean;
  onChecked: React.Dispatch<React.SetStateAction<boolean>>;
  error?: string;
  helperTxt?: string;
}

const ToggleSwitch: FunctionComponent<ToggleSwitchProps> = (props) => {
  const { text, checked, onChecked, error, helperTxt } = props;
  const hasError = !!error;

  return (
    <>
      <label className='relative inline-flex items-center cursor-pointer text-slate-700 dark:text-slate-400 gap-3'>
        <input
          type='checkbox'
          className='sr-only peer'
          checked={checked}
          onChange={(e) => onChecked(e.target.checked)}
        />
        <div className='w-12 h-6 bg-slate-300 dark:bg-slate-700 rounded-full peer peer-checked:bg-rose-600 transition-colors duration-200'></div>
        <span className='dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
        {text}
      </label>

      {hasError ? (
        <p className='text-xs text-red-500'>{error}</p>
      ) : (
        helperTxt && (
          <p className='text-xs text-slate-700 dark:text-slate-400'>
            {helperTxt}
          </p>
        )
      )}
    </>
  );
};

export default ToggleSwitch;
