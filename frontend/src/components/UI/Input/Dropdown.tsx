import { useState, type FunctionComponent } from 'react';

interface DropdownProps {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperTxt?: string;
}

const Dropdown: FunctionComponent<DropdownProps> = (props) => {
  const { categories, value, onChange, error, helperTxt } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const hasError = !!error;

  const handleSelect = (category: string) => {
    onChange(category);
    setIsOpen(false);
  };

  return (
    <div className='flex flex-col w-full text-sm relative'>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className={`text-left outline-none capitalize px-3 bg-slate-50 dark:bg-slate-900 transition rounded border ${
          hasError
            ? 'border-red-500'
            : 'border-slate-300 dark:border-slate-600'
        }  text-base py-2 mt-6`}
      >
        <span>{value || 'Select a Category'}</span>
        <svg
          className={`w-5 h-5 inline float-right transition-transform duration-200 ${
            isOpen ? 'rotate-0' : '-rotate-90'
          }`}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='#FF2056'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {isOpen && (
        <ul className='bg-slate-50 dark:bg-slate-900 w-full input-box flex-col mt-1 p-2 border border-slate-200 dark:border-slate-800 rounded absolute top-16 z-30'>
          {categories.map((category: string) => (
            <li
              key={category}
              className='py-2 hover:text-rose-600 dark:hover:text-rose-500 cursor-pointer capitalize'
              onClick={() => handleSelect(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
      {hasError ? (
        <p className='text-xs text-red-500 mt-1'>{error}</p>
      ) : (
        helperTxt && (
          <p className='text-xs text-slate-700 dark:text-slate-400 mt-1'>
            {helperTxt}
          </p>
        )
      )}
    </div>
  );
};

export default Dropdown;
