import type React from 'react';
import type { FunctionComponent } from 'react';

interface SearchProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search: FunctionComponent<SearchProps> = ({ setSearch }) => {
  return (
    <>
      <div className='input-box max-w-150'>
        <div className='flex w-full gap-3'>
          <i className='ri-search-line text-rose-600' />
          <input
            type='search'
            placeholder='search by service name'
            className='w-full bg-transparent outline-none'
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default Search;
