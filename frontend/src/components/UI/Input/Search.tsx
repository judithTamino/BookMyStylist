import type React from 'react';
import type { FunctionComponent } from 'react';
import Input from './Input';

interface SearchProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  size?:'sm' | 'md' | 'lg';
}

const Search: FunctionComponent<SearchProps> = (props) => {
  const { setSearch, size = 'md' } = props;
  return (
    <div className='max-w-150'>
      <Input
        name='search'
        type='search'
        placeholder='search by service name'
        leftIcon={<i className='ri-search-line' />}
        onChange={(e) => setSearch(e.target.value)}
        sizes={size}
      />
    </div>
  );
};

export default Search;
