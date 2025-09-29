import { useState } from 'react';

interface IPagination<T> {
  data: T[];
  itemsPerPage?: number;
}

export function usePagination<T>({data, itemsPerPage = 4} : IPagination<T>) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  const currentData = data.slice(firstIndex, lastIndex);

  const onPageChange = (data: {selcted: number}) => {
    setCurrentPage(data.selcted + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {currentPage, setCurrentPage, currentData, itemsPerPage, onPageChange, totalItems: data.length}
}
