import type { FunctionComponent, ReactNode } from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message: string;
  action?: ReactNode;
}

const EmptyState: FunctionComponent<EmptyStateProps> = (props) => {
  const { icon = 'ri-information-line', title, message, action } = props;

  return (
    <div className='flex flex-col items-center justify-center py-12 text-center'>
      <i className={`${icon} text-5xl text-rose-600 mb-4 bg-rose-600/10 rounded-full p-4`} />
      <h2 className='text-lg font-semibold text-slate-700 dark:text-slate-400'>
        {title}
      </h2>
      <p className='text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4'>
        {message}
      </p>
      {action}
    </div>
  );
};

export default EmptyState;
