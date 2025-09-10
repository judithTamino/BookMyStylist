import type { FunctionComponent, ReactNode } from 'react';
import Button from '../Button/Button';

interface ModalProps {
  open: boolean;
  cancelBtn?: () => void;
  primaryBtn?: () => void;
  icon?: string | ReactNode;
  contect?: ReactNode;
  title: ReactNode;
  variant?: 'danger' | 'primary';
}

const Modal: FunctionComponent<ModalProps> = (props) => {
  const {
    open,
    cancelBtn,
    primaryBtn,
    icon,
    contect,
    title,
    variant = 'primary',
  } = props;
  const modalVariant = {
    danger: 'bg-red-100 dark:bg-red-950',
    primary: 'bg-rose-200 dark:bg-rose-950',
  };
  const btn = variant === 'danger' ? 'danger' : '';

  if (!open) return null;

  return (
    <div className='w-full h-full absolute top-0 left-0 flex justify-center items-center bg-white dark:bg-slate-950'>
      <div className='flex flex-col items-center bg-slate-50 dark:bg-slate-900 shadow-md rounded py-6 px-5 md:w-[460px] w-[300px] border border-slate-200 dark:border-slate-800'>
        {icon && (
          <div
            className={`flex items-center justify-center ${modalVariant[variant]} bg-${modalVariant[variant]} rounded-full w-14 h-14 text-2xl`}
          >
            {icon}
          </div>
        )}

        <h2 className='text-slate-900 dark:text-slate-100 font-semibold mt-4 text-xl'>
          {title}
        </h2>

        <p className='text-sm text-slate-700 dark:text-slate-400 mt-2 text-center'>
          {contect}
        </p>

        <div className='flex items-center justify-center gap-4 mt-5 w-full'>
          {cancelBtn && (
            <Button variant={`${btn}secondary`} size='sm' onClick={cancelBtn}>
              Cancel
            </Button>
          )}

          {primaryBtn && (
            <Button variant={`${btn}primary`} size='sm' onClick={primaryBtn}>
              Confirm
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
