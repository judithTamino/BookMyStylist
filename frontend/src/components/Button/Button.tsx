import type { FunctionComponent } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: FunctionComponent<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='btn-primary'
    >
      {label}
    </button>
  );
};

export default Button;
