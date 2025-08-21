import type { FunctionComponent } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='bg-amber-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-md hover:shadow-amber-500/50 transition cursor-pointer'
    >
      {label}
    </button>
  );
};

export default Button;
