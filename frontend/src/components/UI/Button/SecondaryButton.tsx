import type { FunctionComponent } from 'react';

interface SecondaryButtonProps {
  label: string;
  onClick: () => void;
}

const SecondaryButton: FunctionComponent<SecondaryButtonProps> = ({
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className='btn border-2 border-rose-600 text-rose-600 hover:bg-rose-600/10'
    >
      {label}
    </button>
  );
};

export default SecondaryButton;
