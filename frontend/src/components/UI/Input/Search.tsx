import type React from 'react';
import type { FunctionComponent } from 'react';
import Input from './Input';

interface SearchProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Search: FunctionComponent<SearchProps> = ({ setSearch }) => {
  return (
    <div className='max-w-150'>
      <Input
        name='search'
        type='search'
        placeholder='search by service name'
        helperTxt='Type to find services'
        leftIcon={<i className='ri-search-line' />}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
