import { useState, type FunctionComponent } from 'react';
import { getActiveServices } from '../../services/services.service';
import type { IService } from '../../interface/service.interface';
import { errorMsg } from '../../services/toastify.service';

interface DropdownProps {
  categories: string[];
  onSelectCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
}

const Dropdown: FunctionComponent<DropdownProps> = ({categories, selectedCategory, onSelectCategory}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleSelect = (category:string) => {
    onSelectCategory(category);
    setIsOpen(false);
  };

  return (
    <div className='flex flex-col w-60 text-sm relative'>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='input-box text-left bg-transparent outline-none text-slate-900 border-none'
      >
        <span>{selectedCategory}</span>
        <svg
          className={`w-5 h-5 inline float-right transition-transform duration-200 ${
            isOpen ? 'rotate-0' : '-rotate-90'
          }`}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='#6B7280'
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
        <ul className='w-full input-box flex-col mt-1'>
          {categories.map((category: string) => (
            <li
              key={category}
              className='py-2 hover:text-indigo-600 dark:hover:text-indigo-500 cursor-pointer'
              onClick={() => handleSelect(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
