import type React from 'react';
import type { FunctionComponent, ReactNode } from 'react';
import Button from '../UI/Button/Button';

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
    <div className='absolute left-0 top-0 bg-slate-50 dark:bg-slate-900 w-full rounded shadow z-20'>
      <Button variant='text' onClick={handleClosePopup}>
        <i className='ri-close-large-line cursor-pointer' />
      </Button>
    
      <div className='p-4'>{children}</div>
    </div>
  );
};

export default ServiceDescriptionPopup;
