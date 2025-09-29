import type { FunctionComponent } from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  handlePageChange: (data: any) => void;
}

const Pagination: FunctionComponent<PaginationProps> = (props) => {
  const { totalItems, itemsPerPage, handlePageChange } = props;
  return (
    <ReactPaginate
      previousLabel={<i className='ri-arrow-left-wide-line' />}
      previousClassName='pagination-btn'
      nextLabel={<i className='ri-arrow-right-wide-line' />}
      nextClassName='pagination-btn'
      pageCount={Math.ceil(totalItems / itemsPerPage)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      containerClassName='flex justify-between items-center mt-8 cursor-pointer'
      activeClassName='text-rose-600 font-bold'
      onPageChange={handlePageChange}
    />
  );
};

export default Pagination;
