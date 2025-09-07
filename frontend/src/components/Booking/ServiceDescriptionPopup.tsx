import type React from 'react';
import type { FunctionComponent, ReactNode } from 'react';
import ButtonIcon from '../UI/Button/ButtonIcon';

interface ServiceDescriptionPopupProps {
  showPopup: boolean;
  closePopup: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

const ServiceDescriptionPopup: FunctionComponent<
  ServiceDescriptionPopupProps
> = ({ showPopup, closePopup, children }) => {
  if (!showPopup) return null;

  const handleClosePopup = () => closePopup(false);

  return (
    <div className='absolute left-0 right-0 top-0 bg-slate-50 dark:bg-slate-900 w-full rounded-md shadow p-4 z-20'>
      <ButtonIcon onClick={handleClosePopup}>
        <i className='ri-close-large-line cursor-pointer' />
      </ButtonIcon>

      <div className='mt-2'>{children}</div>
    </div>
  );
};

export default ServiceDescriptionPopup;
