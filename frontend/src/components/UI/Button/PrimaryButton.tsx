import type { FunctionComponent } from 'react';

interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
}

const PrimaryButton: FunctionComponent<PrimaryButtonProps> = ({
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className='btn text-slate-100 bg-rose-600 hover:bg-rose-700 dark:hover:bg-rose-500'
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
