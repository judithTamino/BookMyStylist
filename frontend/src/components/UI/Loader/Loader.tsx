import type { FunctionComponent } from 'react';

interface LoaderProps {
  loading: boolean;
}

const Loader: FunctionComponent<LoaderProps> = (props) => {
  const { loading } = props;

  if (!loading) return null;

  return (
    <div className='flex space-y-10'>
      <div className='flex justify-center space-x-1'>
        <div className='w-4 h-4 bg-rose-600 rounded animate-bounce'></div>
        <div className='w-4 h-4 bg-rose-600 rounded animate-bounce delay-100'></div>
        <div className='w-4 h-4 bg-rose-600 rounded animate-bounce delay-200'></div>
      </div>
    </div>
  );
};

export default Loader;
